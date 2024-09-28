import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayNPRCurrency from '../helpers/displayCurrency';
import { MdDelete, MdShoppingCart } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

// Modal Component
const ConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-80 text-center relative">
                {/* Close Icon */}
                <div
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-semibold cursor-pointer"
                    onClick={onClose}
                >
                    <CgClose size={20} />
                </div>
                <p className="text-lg mb-4 text-red-500 font-semibold">Are you sure you want to remove this item from your cart?</p>
                <div className="flex justify-around">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [redirecting, setRedirecting] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();
    const loadingCart = new Array(4).fill(null);

    // Fetch cart data for the current user
    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData(responseData.data);
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Failed to fetch cart data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Update cart product quantity
    const updateCartProduct = async (id, quantity) => {
        if (quantity < 1) return; // Prevent negative quantity
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: id, quantity })
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Failed to update cart product:", error);
        }
    };

    // Delete product from cart
    const deleteCartProduct = async () => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: productToDelete })
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData(prevData => prevData.filter(product => product._id !== productToDelete));
                context.fetchUserAddToCart(); // Update the context if necessary
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Failed to delete cart product:", error);
        } finally {
            setShowModal(false); // Close the modal after deletion
        }
    };

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setShowModal(true);
    };

    const handleContinueShopping = async () => {
        setRedirecting(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation
        navigate('/');
        setRedirecting(false);
    };

    // New function to handle navigation to the payment page
    const handleProceedToPayment = () => {
        const totalAmount = data.reduce((acc, product) => acc + (product.quantity * product.productId.sellingPrice), 0);
        navigate('/payment', { state: { totalAmount } }); // Redirect to the payment page with totalAmount
    };

    const totalQty = data.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = data.reduce((acc, product) => acc + (product.quantity * product.productId.sellingPrice), 0);

    return (
        <div className='container mx-auto'>
            {data.length === 0 && !loading && (
                <div className='text-center text-lg my-3'>
                    <MdShoppingCart className='text-gray-400 text-6xl mx-auto mb-4' />
                    <p className='text-red-600 font-semibold mb-2'>No items found in cart!</p>
                    <p className='text-slate-500 mb-4'>Please continue shopping to add items to cart.</p>
                    <button
                        className='bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105'
                        onClick={handleContinueShopping}
                    >
                        {redirecting ? 'Loading...' : 'Continue Shopping'}
                    </button>
                </div>
            )}

            {data.length > 0 && (
                <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                    <div className='w-full max-w-3xl'>
                        {loading ? (
                            loadingCart.map((_, index) => (
                                <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                            ))
                        ) : (
                            data.map(product => (
                                <div key={product._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]' >
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product.productId.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt='Product' />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        <div
                                            className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                            onClick={() => handleDeleteClick(product._id)}
                                        >
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product.productId.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product.productId.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayNPRCurrency(product.productId.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayNPRCurrency(product.quantity * product.productId.sellingPrice)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button
                                                className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                                onClick={() => updateCartProduct(product._id, product.quantity - 1)}
                                                disabled={product.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{product.quantity}</span>
                                            <button
                                                className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                                onClick={() => updateCartProduct(product._id, product.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-blue-600 px-4 py-2 text-xl'>Summary</h2>
                                <div className='p-4 space-y-2'>
                                    <div className='flex justify-between'>
                                        <span className='text-slate-500 text-xl'>Total Quantity:</span>
                                        <span className='font-semibold text-xl'>{totalQty}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-slate-500 text-xl'>Total Amount:</span>
                                        <span className='font-semibold text-xl'>{displayNPRCurrency(totalPrice)}</span>
                                    </div>
                                    <button
                                        className='bg-blue-600 text-white px-8 py-2  text-xl rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105'
                                        onClick={handleProceedToPayment}
                                        disabled={redirecting}
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={deleteCartProduct}
            />
        </div>
    );
};

export default Cart;