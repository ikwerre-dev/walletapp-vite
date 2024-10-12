import React from 'react';
import { ChevronLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div className="min-h-screen bg-indigo-100 p-4">


            <main className="flex-grow my-[5rem] bg-white p-[2.5rem] rounded rounded-2xl">
                <h2 className="text-2xl font-bold text-indigo-500 mb-6">Welcome Back</h2>
                <form className="space-y-4">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="e.g. email@example.com" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input type="password" id="password" placeholder="Enter your password" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Eye className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div> 
                    <div className="mt-6 text-right">
                        <p className="text-sm text-gray-500">Forgot Password? <Link to="/forgot-password" className='text-indigo-700'>Recover Account</Link></p>

                    </div>
                    <Link to={'/'}>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                             Login
                        </button> 
                    </Link>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">Dont have an account? <Link to="/signup" className='text-indigo-700'>Signup</Link></p>

                </div>
            </main>
        </div>
    );
};

export default Login;