import React from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import { Link } from 'react-router-dom';

const BankingHomeScreen = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
            <header className="flex justify-between sticky z-50 top-0 bg-[#270685] items-center p-4">
            <div className="flex items-center space-x-3">
                    <img src={user} alt="User" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="text-xs opacity-80">Hello,</p>
                        <h1 className="text-sm font-bold">Alexxie!</h1>
                    </div>
                </div>
                <button className="p-2">
                    <Settings className="w-6 h-6" />
                </button>
            </header>

            <div
                className="bg-[#4e32a3] mx-4 my-3 p-4 py-6 rounded-3xl shadow-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${cardBg})`, backgroundPosition: 'center' }}
            >        <p className="text-center text-xs text-gray-300 opacity-80 mb-2">Main balance</p>
                <h2 className="text-center text-3xl font-bold mb-4">$14,235.34</h2>
                <div className="flex justify-around">
                    <Link to='/deposit' className="flex flex-col items-center">
                        <div className=" p-2 rounded-full ">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                        <span className="text-xs">Deposit</span>
                    </Link>
                    <button className="flex flex-col items-center">
                        <div className=" p-2 rounded-full ">
                            <ArrowDown className="w-4 h-4" />
                        </div>
                        <span className="text-xs">Withdraw</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className=" p-2 rounded-full ">
                            <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-xs">Earn</span>
                    </button>
                </div>
            </div>

             <div className="bg-white text-black p-4 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Recent Referrals</h3>
                <div className="flex space-x-4 overflow-scroll mb-6">
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                            <span className="text-2xl text-indigo-600"><Link2 /></span>
                        </div>
                        <span className="text-xs">Link</span>
                    </button>
                    {['Ali', 'Steve', 'Ahmed', 'Alex', 'Steve', 'Ahmed', 'Alex'].map((name) => (
                        <button key={name} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
                                <img
                                    src={user}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs">{name}</span>
                        </button>
                    ))}
                </div>


                 <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Latest Transactions</h3>
                        <Link to="/history" className="text-indigo-600 text-sm">View all</Link>
                    </div>
                    {[
                        { name: 'Deposit', date: 'Today 12:32', amount: 35.23, icon: '+' },
                        { name: 'Earnings', date: 'Yesterday 02:12', amount: 430.00, icon: '+' },
                        { name: 'Withdrawal', date: 'Dec 24 13:53', amount: -13.00, icon: '-' },
                    ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-lg">{transaction.icon}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{transaction.name}</p>
                                    <p className="text-xs text-gray-500 text-xs">{transaction.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                                </span>
                                <ArrowUp className="w-4 h-4 ml-2 transform rotate-45" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             
        </div>
    );
};

export default BankingHomeScreen;