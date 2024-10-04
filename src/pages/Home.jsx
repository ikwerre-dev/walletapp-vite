import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import user from '../assets/user.png';
import TransactionHistory from '../components/TransactionHistory';
import BalanceCard from '../components/BalanceCard';
import Header from '../components/Header';
import useUserData from '../components/Data.jsx'; // Import the custom hook
import axios from 'axios';
import { Link } from 'react-router-dom';

const BankingHomeScreen = () => {
    const { userData, loading,jwt } = useUserData(); // Access the user data and loading state
    const [DepositStatus, setDepositStatus] = useState('');
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
            <Header />
            <div className="px-1">
                <BalanceCard amount={userData ? userData.balance : 0} type={1} />
            </div>
            <div className="bg-white text-black px-6 p-4 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Recent Referrals</h3>
                <div className="flex space-x-4 overflow-x-scroll mb-6">
                    <button className="flex sticky left-0 bg-white pr-2 rounded-lg flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                            <span className="text-2xl text-indigo-600"><Link2 /></span>
                        </div>
                        <span className="text-xs">Link</span>
                    </button>
                    {['Ali', 'Steve', 'Ahmed', 'Alexie', 'Steveie', 'Ahmedie', 'Alex'].map((name) => (
                        <button key={name} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
                                <img
                                    src={user}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs">{name}</span>
                        </button>
                    ))}
                </div>

                {
                    DepositStatus.data && DepositStatus.data.is_withdrawn == 0 && DepositStatus.active == 1 && DepositStatus.data.task_day == 4 ?
                        <>
                            <div className='bg-indigo-500 p-5 my-7 rounded-2xl text-white w-full'>
                                <p className='text-sm pb-3'>Your Withdrawal is now available </p>
                                <Link to='/withdraw' className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-900 mt-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Withdraw</Link>

                            </div>
                        </> : <>
                        </>

                }
                <TransactionHistory />
            </div>
        </div>
    );
};

export default BankingHomeScreen;
