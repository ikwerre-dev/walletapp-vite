import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, Info, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import user from '../assets/user.png';
import BalanceCard from '../components/BalanceCard';
import useUserData from '../components/Data.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const shareLinks = [
    { title: 'Share The Link', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
];

const Earn = ({ maxShares = 20 }) => {
    const { userData, loading, jwt } = useUserData();
    const [progress, setProgress] = useState(0);
    const [showClaimButton, setShowClaimButton] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [depositStatus, setDepositStatus] = useState(null);
    const [daysPassed, setDaysPassed] = useState(0);
    const [InvalidTask, setInvalidTask] = useState(false);
    const [Task_Day, setTask_Day] = useState(0);
    const [Task_ID, setTask_ID] = useState(0);
    const [Task_package_name, setTask_package_name] = useState('');
    const [Task_claimed_bonus, setTask_claimed_bonus] = useState(0);
    const [UnverifiedTask, setUnverifiedTask] = useState(true);
    const [isTaskAvailable, setIsTaskAvailable] = useState(false);
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);



    useEffect(() => {
        const taskCompleteCookie = Cookies.get('taskComplete');
        if (taskCompleteCookie) {
            setProgress(parseInt(taskCompleteCookie));

            if (taskCompleteCookie >= maxShares) {
                setShowClaimButton(true);

            }
        }
    }, []);

    // console.log(daysPassed)
    useEffect(() => {
        if (jwt) {
            fetchDepositData();
        }
    }, [jwt]);

    useEffect(() => {
        if (depositStatus && depositStatus.data) {
            const createdAt = new Date(depositStatus.data.created_at);
            const today = new Date();
            const differenceInTime = today.getTime() - createdAt.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
            // console.log('days_difference: ' + differenceInDays);
            // console.log('task day: ' + depositStatus.data.task_day);
            setDaysPassed(differenceInDays);
            setTask_Day(depositStatus.data.task_day)
            setTask_ID(depositStatus.data.id)
            setTask_package_name(depositStatus.data.package_name)
            setTask_claimed_bonus(depositStatus.data.claimed_bonus)
            if (differenceInDays > depositStatus.data.task_day) {
                setInvalidTask(true)
            }

            if (depositStatus.data.status != 1) {
                setUnverifiedTask(false)
            }


            // Check if a new day has started since the last task
            // setIsTaskAvailable(differenceInDays >= depositStatus.data.task_day && depositStatus.data.task_day <= 4);
            // Check if depositStatus and task_day are defined before proceeding
            if (depositStatus && depositStatus.data && typeof depositStatus.data.task_day === 'number') {
                const taskDay = depositStatus.data.task_day;

                // Ensure that taskDay is valid and within the expected range
                const isTaskAvailable = (differenceInDays >= taskDay) && (taskDay < 4);

                // Set the task availability
                setIsTaskAvailable(isTaskAvailable);
                // console.log('day' + isTaskAvailable)
            } else {
                console.error('depositStatus or task_day is undefined');
                // Optionally, handle the case where the data is unavailable
            }

        }
    }, [depositStatus]);


    const claimProfit = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}ClaimBonus`,
                {
                    id: Task_ID
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log(response.data);
            toast.info(response.data.message);

            setShowConfetti(true);

            setTimeout(() => {
                setShowConfetti(false);
                navigate(0)
            }, 5000);
        } catch (error) {
            console.error('Error fetching deposit details:', error);
            toast.error('Failed to fetch deposit details');
        }
    };


    const fetchDepositData = async () => {
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
        } catch (error) {
            console.error('Error fetching deposit details:', error);
            toast.error('Failed to fetch deposit details');
        }
    };

    const handleShare = async () => {
        if (!isTaskAvailable) {
            toast.info("You've already completed today's task. Come back tomorrow!");
            return;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Just got paid $7,500 to my cashapp !',
                    text: 'Just got paid $7,500 to my cashapp . All you need is just to share post and you get paid daily. Hit the link or text +15512270514 to help you with everything. Let me know when you get paid…',
                    url: "https://forexforumprogram.org/",
                });
                console.log('Share dialog opened successfully');

                if (progress < maxShares) {
                    const newProgress = progress + 1;
                    setProgress(newProgress);
                    Cookies.set('taskComplete', newProgress, { expires: 1 }); // Store task completion in cookie for 1 day
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

    const handleClaim = async () => {
        try {
            // Send data to API to record the completed task
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}recordCompletedTask`,
                { userId: userData.id, id: depositStatus.data.id, day: daysPassed + 1 },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            // console.log(response.data)
            if (response.data.status == 1) {
                setClaimed(true);
                toast.success('Task completed successfully!');

                // Update local state
                setIsTaskAvailable(false);
                setDepositStatus(prevState => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        task_day: daysPassed
                    }
                }));

                // Reset progress
                setTimeout(() => {
                    Cookies.remove('taskComplete'); // Remove the cookie after task is claimed
                    navigate(0)
                }, 1500);
            } else {
                toast.error('Failed to record completed task');
            }
        } catch (error) {
            console.error('Error recording completed task:', error);
            toast.error('Failed to record completed task');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    
    const isEligibleForBonus = () => {
        const eligiblePackages = ['premium', 'gold', 'emerald'];
         
        // Convert Task_package_name to lowercase
        const lowerCasePackageName = Task_package_name.toLowerCase();
    
        // Check package name condition
        const isPackageEligible = eligiblePackages.includes(lowerCasePackageName);
        console.log('Package Name:', lowerCasePackageName);
        console.log('Is Package Eligible:', isPackageEligible);
        
        // Check bonus condition
        const isBonusUnclaimed = Task_claimed_bonus === 0;
        console.log('Claimed Bonus:', Task_claimed_bonus);
        console.log('Is Bonus Unclaimed:', isBonusUnclaimed);
        
        // Check day count condition
        const isTask_DayMet = Task_Day > 2;
        console.log('Day Count:', Task_Day);
        console.log('Is Day Count Met:', isTask_DayMet);
        
        // Final result
        const finalResult = isPackageEligible && isBonusUnclaimed && isTask_DayMet;
        console.log('Final Eligibility Result:', finalResult);
        
        return (
          isPackageEligible && 
          isBonusUnclaimed && 
          isTask_DayMet
        );
    };
    
      
      

    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
            <BalanceCard amount={userData.balance} type={2} />

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Earn</h3>
                {/* ... (rest of the UI code remains the same) ... */}

                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    {depositStatus && depositStatus.data ? (
                        <>
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
                                {showConfetti && <Confetti />}
                                {isEligibleForBonus() ? (
                                    <div className="my-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
                                        <strong className="block font-medium my-1">
                                            Congratulations
                                        </strong>
                                        <span>
                                            Congratulations you've been selected as the winner of monthly PCH price.
                                            Hit the claim to be added to your balance.
                                        </span>
                                        <button
                                            onClick={claimProfit}
                                            className="w-full py-2 px-4 border text-center border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-900 mt-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Claim
                                        </button>
                                    </div>
                                ) : (
                                   ""
                                )}

                                <h4 className="font-semibold mb-2">Share to earn:</h4>
                                <div className="">
                                    <p className='text-xs mb-2 flex gap-2'><Info size={15} /> Our system can detect if the link was not shared, which may result in freezing your account</p>
                                    <p className='text-xs flex mb-2 gap-2'><Info size={15} /> You will earn 20% return when someone clicks on your link and invest </p>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {shareLinks.map((link, index) => (
                                        UnverifiedTask && !InvalidTask ? (
                                            <button
                                                key={index}
                                                className={`flex items-center w-full gap-5 px-4 py-2 text-sm font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isTaskAvailable ? 'text-white bg-indigo-500 hover:bg-indigo-800' : 'text-gray-500 bg-gray-200 cursor-not-allowed'}`}
                                                onClick={handleShare}
                                                disabled={!isTaskAvailable}
                                            >
                                                <Share2 className="w-4 h-4" />
                                                <p>{link.title}</p>
                                            </button>
                                        ) : null
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

                            {!UnverifiedTask && (
                                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md">
                                    <strong className="block font-medium">Please Wait!</strong>
                                    <span>Your Deposit is still pending.</span>
                                </div>
                            )}

                            {!isTaskAvailable ? (
                                daysPassed >= 4 ? (
                                    <div className="mt-4 p-4 bg-green-100 border grid border-green-400 text-green-800 rounded-md">
                                        <strong className="block font-medium">Withdrawal Available</strong>
                                        <span>Head over to the withdrawals page to process your withdrawal.</span>
                                        <Link to='/withdraw' className="w-full py-2 px-4 border text-center border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-900 mt-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Withdraw</Link>
                                    </div>
                                ) : (
                                    <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md">
                                        <strong className="block font-medium">Task Completed</strong>
                                        <span>You've already completed today's task. Come back tomorrow for a new task!</span>

                                    </div>
                                )
                            ) :
                                (
                                    <>
                                        {InvalidTask && (
                                            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-yellow-800 rounded-md">
                                                <strong className="block font-medium">Task Unavailable</strong>
                                                <span>Task is currently unavailable as you missed a day in your task!</span>
                                            </div>
                                        )}
                                    </>
                                )

                            }


                        </>
                    ) : (
                        <div className="text-center">No active deposit found. Please make a deposit to start earning.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Earn;