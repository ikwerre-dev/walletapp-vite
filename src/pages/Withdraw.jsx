import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BalanceCard from '../components/BalanceCard';
import useUserData from '../components/Data.jsx'; // Import the custom hook
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
    const { userData, loading, jwt } = useUserData(); // Access the user data and loading state
    const [DepositStatus, setDepositStatus] = useState('');
    const [DepositDay, setDepositDay] = useState(0);
    const [NextWithdrawalDate, setNextWithdrawalDate] = useState('-');
    const [WithdrawalMethod, setWithdrawalMethod] = useState('-');
    const [WithdrawalAmount, setWithdrawalAmount] = useState(0);
    const [WithdrawalMethodText, setWithdrawalMethodText] = useState('');
    const [withdrawalInput, setWithdrawalInput] = useState('');  // State for the input value
    const [withdrawalResponse, setWithdrawalResponse] = useState(''); // State for withdrawal response
    const [SubmitButtonText, setSubmitButtonText] = useState('Withdraw'); // State for withdrawal response
    const [SubmitButtonDisabled, setSubmitButtonDisabled] = useState(false); // State for withdrawal response
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}getLastDeposit`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        }
                    );
                    setDepositStatus(response.data);
                    setNextWithdrawalDate(response.data.time_left);
                    setWithdrawalAmount(
                        ((parseInt(response.data.data.task_day) * 0.2 * parseInt(response.data.data.amount)) + parseInt(response.data.data.amount)).toLocaleString()
                    );

                    setDepositDay(response.data.data.task_day);
                    const packageName = response.data.data.package_name;

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
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchData();
        }
    }, [jwt]);

    const handleWithdrawal = async () => {
        if (DepositStatus.data && DepositStatus.data.id) {
            setSubmitButtonText('Loading...')
            setSubmitButtonDisabled(true)
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}withdraw`,
                    {
                        id: DepositStatus.data.id,
                        wallet: withdrawalInput,  // Send the input value to the API
                        paymentmethod: WithdrawalMethod,  // Send the input value to the API
                        amount: WithdrawalAmount,  // Send the input value to the API
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                setWithdrawalResponse(response.data);
                console.log(response.data)
                if (response.data.status == 1) {
                    setSubmitButtonText('Withdraw')
                    setSubmitButtonDisabled(false)

                    toast.success(response.data.message || "Withdrawal successful!");
                    navigate('/')
                    // Adjust the message based on your response structure
                } else {
                    setSubmitButtonText('Withdraw')
                    setSubmitButtonDisabled(false)

                    toast.error(response.data.message || "Withdrawal Failed!"); // Adjust the message based on your response structure

                }
            } catch (error) {
                console.error('Error during withdrawal:', error);
                toast.error('Error during withdrawal. Please try again.'); // Alert on error
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>; // Display loading state
    }

    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
            <BalanceCard amount={userData ? userData.balance : 0} type={2} />

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Withdraw</h3>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Days Completed</h3>
                        </div>
                        <div className="bg-gray-500 rounded-sm mt-2">
                            <div
                                className={`progress bg-${DepositDay === 4 ? 'green' : DepositDay === 3 ? 'orange' : 'red'}-500 h-2`}
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
                                placeholder={WithdrawalMethodText}
                                className="border p-2 text-xs w-full rounded rounded-lg outline-none"
                                value={withdrawalInput}  // Set the input value
                                onChange={(e) => setWithdrawalInput(e.target.value)}  // Update the state on input change
                            />
                        </div>

                        <button
                            className={`w-full px-4 py-2 mt-4 text-sm text-white  ${DepositStatus.is_withdrawable == 1 && SubmitButtonDisabled == false ? '' : 'opacity-50'}  bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            disabled={DepositStatus.is_withdrawable !== 1 || SubmitButtonDisabled}
                            onClick={handleWithdrawal} // Call handleWithdrawal on click
                        >
                            {DepositStatus.is_withdrawable === 1 ? SubmitButtonText : 'Withdrawal Unavailable'}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Withdraw;
