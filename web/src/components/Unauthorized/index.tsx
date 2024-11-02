import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { ExclamationCircleIcon } from '@heroicons/react/outline';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/signin');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-800 p-4">
            <div className="relative max-w-lg p-10 bg-white shadow-lg rounded-2xl text-center transform transition hover:scale-105 duration-300 ease-in-out">
                <div className="flex items-center justify-center mb-6">
                    {/* <ExclamationCircleIcon className="h-20 w-20 text-red-500 animate-pulse" /> */}
                </div>
                <h1 className="text-5xl font-bold text-gray-800 mb-2">Access Denied</h1>
                <p className="text-lg text-gray-500 mb-6">
                    Oops! It seems you don't have permission to access this page. Please sign in with the correct account.
                </p>
                <button
                    onClick={handleGoBack}
                    className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 transition transform hover:-translate-y-1 duration-200"
                >
                    Go to Sign In
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 blur-lg rounded-2xl"></div>
            </div>
        </div>
    );
};

export default Unauthorized;
