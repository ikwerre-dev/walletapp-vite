import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, DollarSign, Minus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import { Link } from 'react-router-dom';
const BalanceCard = ({ type, amount=0 }) => {
    return (
        <div
            className="bg-[#4e32a3] mx-4 my-3 p-4 py-6  rounded-3xl shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${cardBg})`, backgroundPosition: 'center' }}
        >        <p className="text-center text-xs text-gray-300 opacity-80 mb-2">Main balance</p>
            <h2 className="text-center text-3xl font-bold mb-4">${amount.toLocaleString(undefined, { maximumFractionDigits: 2,minimumFractionDigits: 2, })}</h2>
            {type == 1 ?
                <div className="flex justify-around">
                    <Link to='/deposit' className="flex flex-col items-center">
                        <div className=" p-2 rounded-full ">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                        <span className="text-xs">Deposit</span>
                    </Link>
                    <Link to='/withdraw' className="flex flex-col items-center">
                        <div className=" p-2 rounded-full ">
                            <ArrowDown className="w-4 h-4" />
                        </div>
                        <span className="text-xs">Withdraw</span>
                    </Link>
                    <Link to='/earn' className="flex flex-col items-center">

                        <div className=" p-2 rounded-full ">
                            <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-xs">Earn</span>
                    </Link>
                </div>
                : ''}
        </div>
    )
}

export default BalanceCard
