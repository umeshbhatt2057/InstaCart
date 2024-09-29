import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const [verificationMessage, setVerificationMessage] = useState('');
    const { token } = useParams();  // Extract the token from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${SummaryApi.verifyEmail.url.replace(':token', token)}`, {  // Replace the token in the URL
                    method: SummaryApi.verifyEmail.method,
                });

                const data = await response.json();

                if (data.success) {
                    toast.success(data.message);
                    setVerificationMessage("Your email has been verified successfully! You can now log in.");
                    setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
                } else {
                    setVerificationMessage(data.message);
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Verification error:', error);  // Log error for debugging
                setVerificationMessage('An error occurred during email verification. Please try again.');
                toast.error('An error occurred during email verification');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [navigate, token]);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? (
                <p>Verifying your email...</p>
            ) : (
                <p>{verificationMessage}</p>
            )}
        </div>
    );
};

export default VerifyEmail;
