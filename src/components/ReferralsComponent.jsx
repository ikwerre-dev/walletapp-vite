import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import user from '../assets/user.png';
import useUserData from './Data.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ReferralsComponent = () => {
    const { userData, loading, referrals } = useUserData(); 
    const [showPopup, setShowPopup] = useState(false);
    const [copied, setCopied] = useState(false);

    if (loading) {
        return <p>Loading...</p>;  
    }

    const referralCode = userData?.referral_code || 'N/A'; 
    const referralLink = `https://forexforum.org/r/${referralCode}`;  

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        toast.success('Referral link copied to clipboard!');
        setTimeout(() => {
            setCopied(false);  
        }, 2000);
    };

    return (
        <div>
            <h3 className="font-bold mb-4">Recent Referrals</h3>
            <div className="flex space-x-4 overflow-x-scroll mb-6">
                <button
                    className="flex sticky left-0 bg-white pr-2 rounded-lg flex-col items-center"
                    onClick={() => setShowPopup(true)} 
                >
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-1">
                        <span className="text-2xl text-indigo-600"><Link2 /></span>
                    </div>
                    <span className="text-xs">Link</span>
                </button>
                 {referrals && referrals?.map((referral, index) => (
                    <button key={index} className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
                            <img
                                src={user}
                                alt={referral.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xs">{referral.first_name}</span>
                    </button>
                ))}
            </div>

             {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm transform transition-all duration-300">
                        <h3 className="font-bold text-lg mb-4">Your Referral Link</h3>
                        <p className="mb-4 text-sm break-all">{referralLink}</p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className={`bg-indigo-600 text-white px-4 py-2 rounded-md transition-transform duration-200 ${copied ? 'scale-105' : ''}`}
                            >
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReferralsComponent;
