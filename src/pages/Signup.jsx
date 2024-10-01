import React from 'react';
import { ChevronLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
const CreateAccountForm = () => {
    return (
        <div className=" flex-col min-h-screen align-center bg-indigo-100 p-4">


            <main className="flex-grow my-[5rem] bg-white p-[2.5rem] rounded rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Create Account</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" placeholder="e.g. John Doe" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="e.g. email@example.com" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" id="phone" placeholder="+1 (234) 5678" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
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
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            I accept <a href="#" className="text-indigo-600">terms and conditions</a> and <a href="#" className="text-indigo-600">privacy policy</a>
                        </label>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create a new account
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className='text-indigo-700'>Login</Link></p>

                </div>
            </main>
        </div>
    );
};

export default CreateAccountForm;