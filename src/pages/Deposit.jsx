import React from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import BalanceCard from '../components/BalanceCard';

const Deposit = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            <BalanceCard type={2} />

             <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Deposit</h3>
                
            </div>

             
        </div>
    );
};

export default Deposit;