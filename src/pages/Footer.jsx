import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, Clock, MoreHorizontal, ArrowUp, DollarSign } from 'lucide-react';

const Footer = () => {
    return (
        <nav className="fixed bottom-0 bg-white w-full text-gray-500 flex justify-around py-2">
            <NavLink
                to="/"
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-indigo-600' : ''}`}>
                <Home className="w-6 h-6" />
                <span className="text-xs">Home</span>
            </NavLink>

            <NavLink
                to="/deposit"
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-indigo-600' : ''}`}>
                <ArrowUp className="w-6 h-6" />
                <span className="text-xs">Deposit</span>
            </NavLink>

            <NavLink
                to="/earn"
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-indigo-600' : ''}`}>
                <DollarSign className="w-6 h-6" />
                <span className="text-xs">Earn</span>
            </NavLink>

            <NavLink
                to="/more"
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-indigo-600' : ''}`}>
                <MoreHorizontal className="w-6 h-6" />
                <span className="text-xs">More</span>
            </NavLink>
        </nav>
    );
};

export default Footer;
