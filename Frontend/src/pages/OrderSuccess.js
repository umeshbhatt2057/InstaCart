import React from 'react';
import { useNavigate } from 'react-router-dom';
import successGif from '../assest/Order.gif'; // Corrected spelling from 'assest' to 'assets'

const OrderSuccess = () => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/'); // Redirect to the homepage or another appropriate page
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-green-100 p-6">
            <div className="flex-grow"></div> {/* This div pushes the content to the bottom */}
            <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg text-center mx-auto mb-2"> {/* Changed background to white */}
                <h1 className="text-4xl font-bold text-green-600 mb-3">Order Successful!</h1> {/* Changed text color to green */}
                <img src={successGif} alt="Order Successful" className="w-1/2 mx-auto mb-4 shadow-md" /> {/* Increased GIF size with shadow */}
                <p className="text-lg text-gray-700  font-semibold mb-4">
                    Thank you for your purchase! Your order has been successfully placed.
                </p>
                <button
                    onClick={handleContinueShopping}
                    className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
