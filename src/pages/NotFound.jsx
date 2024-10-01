import React from 'react';
import { ChevronLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-100 p-4">
            <div className="text-center mb-10">
                <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    <ChevronLeft className="mr-2" />
                    Go Back Home
                </Link>
            </div>
             
        </div>
    );
};

export default NotFound;
