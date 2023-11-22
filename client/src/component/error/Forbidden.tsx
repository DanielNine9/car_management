import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                <h1 className="text-xl font-semibold mb-4">Access Forbidden</h1>
                <p className="text-gray-700">
                    You don't have permission to access this page.
                </p>
            </div>
            <Link to="/" className="absolute left-4 top-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded">
                    Back to Home
                </button>
            </Link>
        </div>

    );
};

export default ForbiddenPage;
