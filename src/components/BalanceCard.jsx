import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, DollarSign, Minus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import { Link } from 'react-router-dom';
import useUserData from '../components/Data.jsx'; // Import the custom hook
import axios from 'axios';
const BalanceCard = ({ type, amount = 0 }) => {
    const { userData, loading, jwt } = useUserData(); // Access the user data and loading state
    const [DepositStatus, setDepositStatus] = useState('');

    const [WithdrawalAmount, setWithdrawalAmount] = useState(0);
    useEffect(() => {

        if (jwt) {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}getLastDeposit`, // API endpoint
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`, // Pass JWT in the Authorization header
                            },
                        }
                    );
                    if (response.data && response.data.data) {
                        const { is_withdrawn, status, task_day, amount } = response.data.data;

                        // Check if status is not 0
                        if (status !== 0) {
                            // Calculate withdrawal amount based on task_day
                            const calculatedAmount = task_day === 0 ? amount : amount * 2;

                            // If is_withdrawn is 1, set the withdrawal amount to 0
                            setWithdrawalAmount(is_withdrawn == 1 ? 0 : calculatedAmount);
                        } else {
                            // If status is 0, set withdrawal amount to 0
                            setWithdrawalAmount(0);
                        }
                    }

                    setDepositStatus(response.data);  // Set user data
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchData();
        } else {
            setLoading(false);  // No JWT means no data; finish loading
        }
    }, []);


    return (
        <div
            className="bg-[#4e32a3] mx-4 my-3 p-4 py-6  rounded-3xl shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${cardBg})`, backgroundPosition: 'center' }}
        >        <p className="text-center text-xs text-gray-300 opacity-80 mb-2">Main balance</p>
            <h2 className="text-center text-3xl font-bold mb-4">${WithdrawalAmount.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2, })}</h2>
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
