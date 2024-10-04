import React, { useState, useEffect } from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, Info, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import user from '../assets/user.png';
import BalanceCard from '../components/BalanceCard';
import useUserData from '../components/Data.jsx';

const shareLinks = [
    { title: 'Share The Link', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
];

const Earn = ({ maxShares = 1 }) => {
    const { userData, loading, jwt } = useUserData();
    const [progress, setProgress] = useState(0);
    const [showClaimButton, setShowClaimButton] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [depositStatus, setDepositStatus] = useState(null);
    const [nextWithdrawalDate, setNextWithdrawalDate] = useState(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState(null);
    const [depositDay, setDepositDay] = useState(null);
    const [withdrawalMethod, setWithdrawalMethod] = useState('');
    const [withdrawalMethodText, setWithdrawalMethodText] = useState('');

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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Get paid just by sharing post on Facebook!',
                    text: 'Check out this amazing site, I did it and its working! I got paid to Cash App, click the link and try it.',
                    url: window.location.href,
                });
                console.log('Share dialog opened successfully');

                if (progress < maxShares) {
                    const newProgress = progress + 1;
                    setProgress(newProgress);
                    if (newProgress === maxShares) {
                        setShowClaimButton(true);
                    }
                }
            } catch (error) {
                console.error('Error sharing:', error);
                toast.error('Share not valid');
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    const handleClaim = () => {
        setClaimed(true);
        setTimeout(() => {
            setProgress(0);
            setShowClaimButton(false);
            setClaimed(false);
        }, 3000);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            <BalanceCard amount={userData.balance} type={2} />

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Earn</h3>
                <div className="flex space-x-4 overflow-scroll mb-6">
                    <button className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                            <span className="text-2xl text-indigo-600"><Link2 /></span>
                        </div>
                        <span className="text-xs">Link</span>
                    </button>
                    {['Ali', 'Steve', 'Ahmed', 'Alex', 'Aaron', 'Honour', 'Alexie'].map((name) => (
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

                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Today's Task</h3>
                        </div>
                        <div className="bg-gray-500 rounded-sm mt-2">
                            <div
                                className="progress bg-green-500 h-2"
                                style={{ width: `${(progress / maxShares) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between w-full">
                            <p>{progress}</p>
                            <p>{maxShares}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-semibold mb-2">Share to earn:</h4>
                        <div className="">
                            <p className='text-xs mb-2 flex gap-2'><p><Info size={15} /> </p>Our system can detect if the link was not shared, Which may result to freezing of your account</p>
                            <p className='text-xs flex mb-2 gap-2'><p><Info size={15} /> </p> You'll earn more whenever someone clicks the referral link and joins</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-5">
                            {shareLinks.map((link, index) => (
                                <button
                                    key={index}
                                    className="flex  items-center  w-full gap-5 px-4 py-2 text-sm   text-gray-700 bg-indigo-500 text-white font-bold border border-gray-300 rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-4 h-4" />
                                    <p>{link.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {showClaimButton && (
                        <button
                            onClick={handleClaim}
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Claim Profit
                        </button>
                    )}

                    {claimed && (
                        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
                            <strong className="block font-medium">Success!</strong>
                            <span>You've claimed your profit. The counter will reset shortly.</span>
                        </div>
                    )}
                </div>

            </div>


        </div>
    );
};

export default Earn;