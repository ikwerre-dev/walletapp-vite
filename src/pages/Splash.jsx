import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Footer = () => {
    return (
<nav className="bg-white text-gray-500 flex justify-around py-2">
                <button className="flex flex-col items-center text-indigo-600">
                    <Home className="w-6 h-6" />
                    <span className="text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center">
                    <Clock className="w-6 h-6" />
                    <span className="text-xs">History</span>
                </button>
                <button className="flex flex-col items-center">
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs">Cards</span>
                </button>
                <button className="flex flex-col items-center">
                    <MoreHorizontal className="w-6 h-6" />
                    <span className="text-xs">More</span>
                </button>
            </nav>
    )
}

export default Footer
