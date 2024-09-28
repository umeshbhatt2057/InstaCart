import React, { useState } from 'react';
import forgotPasswordIcons from '../assest/forgotpasswnedSend.gif'; // Ensure the correct path to the icon
import SummaryApi from '../common'; // Assuming you have SummaryApi for API routes
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // State to handle success message

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            if (response.ok) {
                setMessage(`Password reset link has been sent to ${email}`);
            } else {
                toast.error(data.message || 'Failed to send reset link');
                setMessage(''); // Clear success message if there's an error
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            setMessage(''); // Clear success message if there's an error
        }
        
        setEmail(''); // Clear input after submission
    };

    return (
        <section id='forgot-password'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={forgotPasswordIcons} alt='Forgot Password Icon' />
                    </div>
                    <h2 className='text-center text-2xl font-bold mb-6'>Forgot Password</h2>
                    <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={handleChange}
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Send Reset Link
                        </button>
                    </form>
                    {message && <p className="text-center mt-4 text-green-600">{message}</p>}
                    <p className='my-5 text-center'>
                        Remembered your password?{' '}
                        <a href='/login' className='text-red-600 hover:text-red-700 hover:underline'>
                            Login
                        </a>
                    </p>
                </div>
            </div>
            <ToastContainer
                position="top-center" // Center the toasts horizontally at the top
                autoClose={5000} // Adjust auto close duration if needed
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
};

export default ForgotPassword;
