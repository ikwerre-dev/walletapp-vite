import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BalanceCard from '../components/BalanceCard';
import useUserData from '../components/Data.jsx'; // Import the custom hook
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

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
    const [UnverifiedTask, setUnverifiedTask] = useState(true);
    const [PendingWithdrawal, setPendingWithdrawal] = useState(true);
    const [approvedWithdrawal, setapprovedWithdrawal] = useState(true);
    const [Task_package_name, setTask_package_name] = useState('');
    const [Task_ID, setTask_ID] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

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
                    // alert(response.data.data);
                    if (response.data.data != null) {
                        setDepositStatus(response.data);
                        setNextWithdrawalDate(response.data.time_left);
                        setWithdrawalAmount(
                            ((parseInt(response.data.data.task_day) * 0.2 * parseInt(response.data.data.amount)) + parseInt(response.data.data.amount)).toLocaleString()
                        );
                        setTask_package_name(response.data.data.package_name)

                        if (response.data.data.status != 1) {
                            setUnverifiedTask(false)
                        }
                        setTask_ID(response.data.data.id)

                        if (response.data.data.is_withdrawn != 0) {
                            setPendingWithdrawal(false)
                        }
                        if (response.data.data.withdrawal_status != 1) {
                            setapprovedWithdrawal(false)
                        }



                        setDepositDay(response.data.data.task_day);
                        const packageName = response.data.data.package_name;

                        if (packageName === 'Lite' || packageName === 'Standard') {
                            setWithdrawalMethod('Bitcoin');
                            setWithdrawalMethodText('Enter your Bitcoin wallet address');
                        } else if (packageName === 'Gold' || packageName === 'Emerald') {
                            setWithdrawalMethod('Cashapp');
                            setWithdrawalMethodText('Enter your Cashapp Username');
                        } else {
                            setWithdrawalMethod('Cashapp');
                            setWithdrawalMethodText('Enter your Cashapp username');
                        }
                    } else {

                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchData();
        }
    }, [jwt]);



    const connectAccount = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}connectAccount`,
                {
                    id: Task_ID
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log(response.data.link);
            console.log(response.data);
            if (response.data.data.status == 1) {
                toast.success('Loading Forum Account Connected Successfully!!');

                setShowConfetti(true);

                setTimeout(() => {
                    setShowConfetti(false);
                    // navigate(0)
                    document.location=response.data.link
                }, 5000);

            } else {
                toast.error('Failed to fetch deposit details');

            }

        } catch (error) {
            console.error('Error fetching deposit details:', error);
            toast.error('Failed to fetch deposit details');
        }
    };


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
                // console.log(response.data)
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
            {showConfetti && <Confetti />}

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Withdraw</h3>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">

                    {!UnverifiedTask ? (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md">
                            <strong className="block font-medium">Please Wait!</strong>
                            <span>Your Deposit is still pending.</span>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">

                                {!PendingWithdrawal ? (
                                    <>
                                        {!approvedWithdrawal ? (
                                            <div className="mt-4 p-4 bg-orange-100 border border-orange-400 text-orange-800 rounded-md">
                                                <strong className="block font-medium">Please Wait!</strong>
                                                <span>Your Withdrawal is being processed.</span>
                                            </div>
                                        ) : (
                                            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
                                                <strong className="block font-medium">Withdrawal Succesful!</strong>
                                                <span>Your Withdrawal has being processed.</span>
                                            </div>
                                        )}
                                    </>
                                )
                                    : (
                                        <>
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
                                            <hr className='my-3'/>

                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-gray-600 text-xs">Withdrawal Amount</h3>
                                                <h3 className="font-bold text-xs">${WithdrawalAmount}</h3>
                                            </div>
                                            {
                                                (Task_package_name === 'Premium' && DepositStatus.is_withdrawable === 1) ||
                                                    (Task_package_name === 'Gold' && DepositStatus.is_withdrawable === 1) ||
                                                    (Task_package_name === 'Emerald' && DepositStatus.is_withdrawable === 1) ? (

                                                    <>
                                                        <div className="my-[3rem] p-4 bg-green-100 border grid border-green-400 text-green-800 rounded-md">
                                                            <strong className="block font-medium my-1">Withdrawal Available</strong>
                                                            <span>Withdrawals are done on the loading forum for this amount. Click the link to proceed </span>
                                                            <button onClick={connectAccount} className="w-full py-2 px-4 border text-center border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-900 mt-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Withdraw</button>
                                                        </div>
                                                    </>
                                                ) : (

                                                    <>
                                                        {WithdrawalAmount != 0 ? (
                                                            <>
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
                                                            </>
                                                        ) : ''}
                                                        <button
                                                            className={`w-full px-4 py-2 mt-4 text-sm text-white  ${DepositStatus.is_withdrawable == 1 && SubmitButtonDisabled == false ? '' : 'opacity-50'}  bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                                            disabled={DepositStatus.is_withdrawable !== 1 || SubmitButtonDisabled}
                                                            onClick={handleWithdrawal} // Call handleWithdrawal on click
                                                        >
                                                            {DepositStatus.is_withdrawable === 1 ? SubmitButtonText : 'Withdrawal Unavailable'}
                                                        </button>
                                                    </>
                                                )
                                            }


                                        </>

                                    )}

                            </div>
                        </>
                    )
                    }
                </div>
            </div >
        </div >
    );
};

export default Withdraw;
