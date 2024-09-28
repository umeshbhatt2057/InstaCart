import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To get the reset token from URL and navigate
import SummaryApi from '../common'; // Assuming you have SummaryApi for API routes

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(SummaryApi.resetPassword.url, {
                method: SummaryApi.resetPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: password, resetToken: token }), // Send token and new password
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password has been reset successfully');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after a short delay
                }, 2000);
            } else {
                setMessage(data.message || 'Failed to reset password');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }

        setPassword('');
        setConfirmPassword('');
    };

    return (
        <section id='reset-password'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <h2 className='text-center text-2xl font-bold mb-6'>Reset Password</h2>
                    <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>New Password:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='password'
                                    placeholder='Enter your new password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='password'
                                    placeholder='Confirm your password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                            </div>
                        </div>
                        {message && <p className='text-red-600'>{message}</p>}
                        <button
                            type='submit'
                            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
