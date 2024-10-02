import React from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import { Link } from 'react-router-dom';
import TransactionHistory from '../components/TransactionHistory';
import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header';

const BankingHomeScreen = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white ">
            <Header />
            <div className="px-1">
                <BalanceCard type={1} />
            </div>
            <div className="bg-white text-black px-6 p-4 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Recent Referrals</h3>
                <div className="flex space-x-4 overflow-scroll mb-6">
                    <button className="flex sticky left-0 bg-white pr-2 rounded-lg flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                            <span className="text-2xl text-indigo-600"><Link2 /></span>
                        </div>
                        <span className="text-xs">Link</span>
                    </button>
                    {['Ali', 'Steve', 'Ahmed', 'Alexie', 'Steveie', 'Ahmedie', 'Alex'].map((name) => (
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


                <TransactionHistory />
            </div>


        </div>
    );
};

export default BankingHomeScreen;