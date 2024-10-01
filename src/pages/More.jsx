import React from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';

const More = () => {
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
            <header className="flex justify-between items-center p-4">
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
 
             <div className="bg-white text-black p-4 rounded-t-3xl mt-4 flex-grow">
               

                 <div className="mb-4">
                
                   
                </div>
            </div>

             
        </div>
    );
};

export default More;