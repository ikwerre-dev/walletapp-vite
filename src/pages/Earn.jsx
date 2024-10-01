import React from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import BalanceCard from '../components/BalanceCard';

const Earn = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            <BalanceCard type={2} />

             <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Earn</h3>
                <div className="flex space-x-4 overflow-scroll mb-6">
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                            <span className="text-2xl text-indigo-600"><Link2 /></span>
                        </div>
                        <span className="text-xs">Link</span>
                    </button>
                    {['Ali', 'Steve', 'Ahmed', 'Alex', 'Aaron', 'Honour', 'Alexie'].map((name) => (
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
                        <button className="text-indigo-600 text-sm">View all</button>
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

export default Earn;