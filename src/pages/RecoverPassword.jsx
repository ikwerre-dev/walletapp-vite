import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecoverPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}resetPassword`, {
                email: formData.email
            });
            console.log(response.data)
            if (response.data.status === 1) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/login'); // redirect to login page after success
                }, 3000); // 3 seconds delay
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Password recovery failed. Please try again.');
        } finally {
            setLoading(false); // Set loading to false when the request is done
        }
    };

    return (
        <div className="min-h-screen bg-indigo-100 p-4">
            <ToastContainer /> {/* Toast container to show notifications */}
            <main className="flex-grow my-[5rem] bg-white p-[2.5rem] rounded rounded-2xl">
                <h2 className="text-2xl font-bold text-indigo-500 mb-6">Password Recovery</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange} // Capture input value
                            placeholder="e.g. email@example.com"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Sending...' : 'Send Recovery Email'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Remember your password?{' '}
                        <Link to="/login" className="text-indigo-700">
                            Login
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default RecoverPassword;
