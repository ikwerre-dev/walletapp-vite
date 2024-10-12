import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
        console.log(`${import.meta.env.VITE_API_BASE_URL}login`);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}login`, {
                email: formData.email,
                password: formData.password
            });

            console.log(response.data);

            if (response.data.status === 1) {
                toast.success(response.data.message);
                Cookies.set('jwt', response.data.jwt);
                Cookies.set('refresh_token', response.data.refresh_token);
                navigate('/dashboard');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex-col min-h-screen align-center bg-indigo-100 p-4">
            <ToastContainer />
            <main className="flex-grow my-[5rem] bg-white p-[2.5rem] rounded rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-indigo-700">Create one</Link></p>
                </div>
            </main>
        </div>
    );
};

export default LoginForm;
