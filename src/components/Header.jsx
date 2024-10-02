import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, DollarSign, Minus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header className="flex justify-between sticky z-40 top-0 bg-[#270685] items-center p-4">
            <div className="flex items-center space-x-3">
                <img src={user} alt="User" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="text-xs opacity-80">Hello,</p>
                    <h1 className="text-sm font-bold">Honour!</h1>
                </div>
            </div>
            <Link to='/settings' className="p-2">
                <Settings className="w-6 h-6" />
            </Link>
        </header>
    )
}

export default Header
