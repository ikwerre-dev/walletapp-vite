import React, { useState } from 'react';
import { ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, Info } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import BalanceCard from '../components/BalanceCard';
import { Share2 } from 'lucide-react';
import Header from '../components/Header';

const Settings = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
            <Header /> 


            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Settings</h3>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">

                        <hr className='my-3' />
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">New Password</h3>
                            <input
                                type="password"
                                placeholder={'Enter Password'}
                                className=" border p-2  text-xs   w-full rounded rounded-lg outline-none"
                            />
                        </div>
                        <hr className='my-3' />
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">Confirm Password</h3>
                            <input
                                type="password"
                                placeholder={'Enter Password'}
                                className=" border p-2  text-xs   w-full rounded rounded-lg outline-none"
                            />
                        </div>

                        <button
                            className="w-full px-4 py-2  mt-4 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Settings
                        </button>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Settings;