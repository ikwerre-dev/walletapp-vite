import React, { useState } from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, Info } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import BalanceCard from '../components/BalanceCard';
import { Share2 } from 'lucide-react';

const Withdraw = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            <BalanceCard type={2} />

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Withdraw</h3>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Days Completed</h3>
                        </div>
                        <div className="bg-gray-500 rounded-sm mt-2">
                            <div
                                className="progress bg-green-500 h-2"
                                style={{ width: `${(2 / 4) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between w-full">
                            <p>{2}</p>
                            <p>{4}</p>
                        </div>
                        <hr className='my-3' />
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-600 text-xs">Next Withdrawal Date</h3>
                            <h3 className="font-bold text-xs">24th June 24</h3>
                        </div>
                        <hr className='my-3' />

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-600 text-xs">Withdrawal Method</h3>
                            <h3 className="font-bold text-xs">Paypal <button className='font-bold '>(change)</button></h3>
                        </div>
                        <hr className='my-3' />

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-600 text-xs">Withdrawal Amount</h3>
                            <h3 className="font-bold text-xs">$5,000.00</h3>
                        </div>
                        <hr className='my-3' />
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">Paypal Email</h3>
                            <input
                                type="text"
                                placeholder={'email@gmail.com'}
                                className=" border p-2  text-xs   w-full rounded rounded-lg outline-none"
                            />
                        </div>

                        <button
                             className="w-full px-4 py-2  mt-4 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Withdraw
                        </button>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Withdraw;