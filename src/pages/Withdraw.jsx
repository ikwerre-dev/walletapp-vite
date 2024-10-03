import React, { useState, useEffect } from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, Info, X } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import BalanceCard from '../components/BalanceCard';
import { Share2 } from 'lucide-react';
import useUserData from '../components/Data.jsx'; // Import the custom hook
import axios from 'axios';

const Withdraw = () => {
    const { userData, loading, jwt } = useUserData(); // Access the user data and loading state
    const [DepositStatus, setDepositStatus] = useState('');
    const [DepositDay, setDepositDay] = useState(0);
    const [NextWithdrawalDate, setNextWithdrawalDate] = useState('-');
    const [WithdrawalMethod, setWithdrawalMethod] = useState('-');
    const [WithdrawalAmount, setWithdrawalAmount] = useState('0');
    const [WithdrawalMethodText, setWithdrawalMethodText] = useState('');

    // console.log(DepositStatus)

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
                    setDepositStatus(response.data);  // Set user data
                    setNextWithdrawalDate(response.data.time_left);
                    const packageName = response.data.data.package_name;

                    // Set withdrawal method and corresponding text
                    if (packageName === 'Lite' || packageName === 'Standard') {
                        setWithdrawalMethod('Bitcoin');
                        setWithdrawalMethodText('Enter your Bitcoin wallet address');
                    } else if (packageName === 'Gold' || packageName === 'Emerald') {
                        setWithdrawalMethod('Bank direct deposit');
                        setWithdrawalMethodText('Enter your bank account details');
                    } else {
                        setWithdrawalMethod('Cashapp');
                        setWithdrawalMethodText('Enter your Cashapp username');
                    }
                    console.log(response.data);  // Set user data
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchData();
        } else {
            setLoading(false);  // No JWT means no data; finish loading
        }
    }, []);



    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>; // Display loading state
    }

    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            <BalanceCard amount={userData ? userData.balance : 0} type={2} />

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Withdraw</h3>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">

                    {/* {
                        DepositStatus &&  DepositStatus.data.task_day != 4 ?
                            <>
                                <div className='bg-red-500 p-5 rounded-2xl text-white w-full'>
                                    <h1>Withdrawal is unavailable </h1>
                                    <p className='text-sm mt-3'>Time till next deposit: {DepositStatus.time_left}</p>
                                </div>
                            </> : <> <h1>  hey </h1> </>
                    } */}

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Days Completed</h3>
                        </div>
                        <div className="bg-gray-500 rounded-sm mt-2">
                            <div
                                className={`progress bg-${DepositDay == 4 ? 'green' : DepositDay == 3 ? 'orange' : 'red'}-500 h-2`}
                                style={{ width: `${(DepositDay / 4) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex mt-1 justify-between w-full">
                            <p>{DepositDay}</p>
                            <p>{4}</p>
                        </div>
                        <hr className='my-3' />
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-600 text-xs">Next Withdrawal Date</h3>
                            <h3 className="font-bold text-xs">{NextWithdrawalDate}</h3>
                        </div>
                        <hr className='my-3' />

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-600 text-xs">Withdrawal Method</h3>
                            <h3 className="font-bold text-xs">{WithdrawalMethod}</h3>
                        </div>
                        <hr className='my-3' />

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-gray-600 text-xs">Withdrawal Amount</h3>
                            <h3 className="font-bold text-xs">${WithdrawalAmount}</h3>
                        </div>
                        <hr className='my-3' />
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">{WithdrawalMethodText}</h3>
                            <input
                                type="text"
                                placeholder={'email@gmail.com'}
                                className=" border p-2  text-xs   w-full rounded rounded-lg outline-none"
                            />
                        </div>

                        <button
                            className={`w-full px-4 py-2 mt-4 text-sm text-white ${DepositDay == 4 ? ' ' : ' opacity-50 '}} bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            disabled={DepositDay != 4}  // Disable button when DepositDay is not 4
                        >
                            {DepositDay == 4 ? 'Withdraw' : 'Withdrawal Unavailable'}
                        </button>

                    </div>

                </div>


            </div>


        </div>
    );
};

export default Withdraw;