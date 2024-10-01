import React, { useState } from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import BalanceCard from '../components/BalanceCard';
import { Share2 } from 'lucide-react';

const shareLinks = [
    { title: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { title: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?url=' },
    { title: 'Share on LinkedIn', url: 'https://www.linkedin.com/shareArticle?mini=true&url=' },
];

const Earn = ({ maxShares = 20 }) => {
    const [progress, setProgress] = useState(0);
    const [showClaimButton, setShowClaimButton] = useState(false);
    const [claimed, setClaimed] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Check out this amazing site!',
              text: 'Here is some interesting content I found.',
              url: window.location.href, // You can customize the URL here
            });
            console.log('Content shared successfully');
          } catch (error) {
            console.error('Error sharing:', error);
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
    }; return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            <BalanceCard type={2} />

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
                        <div className="flex flex-wrap gap-2">
                            {shareLinks.map((link, index) => (
                                <button
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-4 h-4" />
                                    {link.title}
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