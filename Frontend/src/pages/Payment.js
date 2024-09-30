import React, { useState } from 'react';
import SummaryApi from '../common';
import { useLocation, useNavigate } from 'react-router-dom';
import displayNPRCurrency from '../helpers/displayCurrency';
import { getDeliveryCharge } from '../helpers/deliverycharge';
import { getDistrictsByProvince } from '../helpers/provinceDistricts';
import esewaIcon from '../assest/esewa_icon (1).png'; // Assuming you have eSewa icon
import khaltiIcon from '../assest/khalti_icon.png'; // Assuming you have Khalti icon

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalAmount } = location.state || {}; // Retrieve total amount from navigation state

    const [shippingAddress, setShippingAddress] = useState({
        province: '',
        district: '',
        municipality: '',
        wardNo: '',
        village: '',
        mobileNumber: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [districts, setDistricts] = useState([]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));

        // Update districts based on selected province
        if (name === 'province') {
            setDistricts(getDistrictsByProvince(value));
            setDeliveryCharge(getDeliveryCharge(value)); // Update delivery charge
            setShippingAddress((prev) => ({ ...prev, district: '' })); // Reset district
        }
    };

    // Handle the order placement
    const handlePlaceOrder = async () => {
        // Validate required fields
        if (!shippingAddress.province || !shippingAddress.district || 
            !shippingAddress.municipality || !shippingAddress.wardNo || 
            !shippingAddress.village || !shippingAddress.mobileNumber || 
            !totalAmount) {
            setErrorMessage('Please fill all the fields and ensure amounts are correct.');
            return;
        }

        setLoading(true);
        setErrorMessage(''); // Reset error message

        const finalAmount = (totalAmount || 0) + deliveryCharge; // Calculate final amount

        const orderDetails = {
            shippingAddress: {
                province: shippingAddress.province,
                district: shippingAddress.district,
                municipality: shippingAddress.municipality,
                wardNo: shippingAddress.wardNo,
                village: shippingAddress.village,
                mobileNumber: shippingAddress.mobileNumber,
            },
            paymentMethod: 'Cash on Delivery', // Set payment method to COD
            totalAmount: totalAmount || 0, // Ensure totalAmount is defined
            deliveryCharge: deliveryCharge,
            finalAmount: finalAmount,
        };

        try {
            const response = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            const responseData = await response.json();
            if (responseData.success) {
                // Clear the cart after a successful order
                await clearCart();

                // Redirect to a success page
                navigate('/order-success'); 
            } else {
                throw new Error(responseData.message);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message to display
        } finally {
            setLoading(false);
        }
    };

    // Function to clear the cart
    const clearCart = async () => {
        try {
            const response = await fetch(SummaryApi.clearCart.url, {
                method: SummaryApi.clearCart.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            if (!responseData.success) {
                throw new Error(responseData.message);
            }
        } catch (error) {
            setErrorMessage(error.message); // Handle any errors during cart clearing
        }
    };

    // Handle key down event to navigate to next input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const formElements = Array.from(e.target.form.elements);
            const index = formElements.indexOf(e.target);
            const nextElement = formElements[index + 1];
            if (nextElement) {
                nextElement.focus();
            }
        }
    };

    return (
        <div className='container mx-auto p-4 max-w-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Payment</h2>
            <div className='bg-white p-4 rounded-lg shadow-md'>
                {errorMessage && <p className='text-red-600 mb-4'>{errorMessage}</p>}
                <form className='space-y-4'>
                    <div>
                        <label className='block mb-1'>Province:</label>
                        <select
                            name='province'
                            value={shippingAddress.province}
                            onChange={handleChange}
                            className='border rounded px-2 py-1 w-full placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-green-300'
                            required
                        >
                            <option value='' disabled>Select Province</option>
                            <option value='1'>Province 1</option>
                            <option value='2'>Province 2</option>
                            <option value='3'>Province 3</option>
                            <option value='4'>Province 4</option>
                            <option value='5'>Province 5</option>
                            <option value='6'>Province 6</option>
                            <option value='7'>Province 7</option>
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1'>District:</label>
                        <select
                            name='district'
                            value={shippingAddress.district}
                            onChange={handleChange}
                            className='border rounded px-2 py-1 w-full placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-green-300'
                            required
                        >
                            <option value='' disabled>Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1'>Municipality:</label>
                        <input
                            type='text'
                            name='municipality'
                            value={shippingAddress.municipality}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} // Added for key navigation
                            className='border rounded px-2 py-1 w-full placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-green-300'
                            placeholder='Enter Municipality'
                            required
                        />
                    </div>
                    <div>
                        <label className='block mb-1'>Ward No:</label>
                        <input
                            type='text'
                            name='wardNo'
                            value={shippingAddress.wardNo}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} // Added for key navigation
                            className='border rounded px-2 py-1 w-full placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-green-300'
                            placeholder='Enter Ward No'
                            required
                        />
                    </div>
                    <div>
                        <label className='block mb-1'>Village:</label>
                        <input
                            type='text'
                            name='village'
                            value={shippingAddress.village}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} // Added for key navigation
                            className='border rounded px-2 py-1 w-full placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-green-300'
                            placeholder='Enter Village'
                            required
                        />
                    </div>
                    <div>
                        <label className='block mb-1'>Mobile Number:</label>
                        <input
                            type='tel'
                            name='mobileNumber'
                            value={shippingAddress.mobileNumber}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} // Added for key navigation
                            className='border rounded px-2 py-1 w-full placeholder-gray-500 text-gray-700 focus:outline-none focus:ring focus:ring-green-300'
                            placeholder='Enter Mobile Number'
                            required
                        />
                    </div>
                    <div className='mt-4'>
                        <p className='text-lg font-semibold'>Delivery Charge: {displayNPRCurrency(deliveryCharge)}</p>
                        <p className='text-lg font-semibold'>Total Amount: {displayNPRCurrency(totalAmount || 0)}</p>
                        <p className='text-lg font-semibold'>Final Amount: {displayNPRCurrency((totalAmount || 0) + deliveryCharge)}</p>
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-4">
                        <p className='text-lg font-semibold'>Pay via:</p>
                    </div>
                    <div className="mt-4 space-y-3">
                        <button
                            type='button'
                            className='w-full bg-gray-500 text-white px-4 py-2 rounded flex items-center justify-center cursor-not-allowed'
                            disabled
                        >
                            <img src={khaltiIcon} alt="Khalti" className="w-6 h-6 mr-2" /> Khalti (Unavailable)
                        </button>

                        <button
                            type='button'
                            className='w-full bg-gray-500 text-white px-4 py-2 rounded flex items-center justify-center cursor-not-allowed'
                            disabled
                        >
                            <img src={esewaIcon} alt="eSewa" className="w-6 h-6 mr-2" /> eSewa (Unavailable)
                        </button>

                        <button
                            type='button'
                            className='w-full bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center'
                            onClick={handlePlaceOrder}
                            disabled={loading}
                        >
                            Cash on Delivery (COD)
                        </button>
                    </div>

                    {/* Loading spinner */}
                    {loading && <p>Processing your order...</p>}
                </form>
            </div>
        </div>
    );
};

export default Payment;
