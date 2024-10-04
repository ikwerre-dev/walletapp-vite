import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUp, Link2, Plus } from 'lucide-react';
import useUserData from '../components/Data.jsx'; // Import the custom hook
import { Link } from 'react-router-dom';

const TransactionPopup = ({ transaction, onClose }) => {

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
     document.addEventListener('mousedown', handleClickOutside);

    return () => {
       document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
      <div ref={popupRef} className="bg-white rounded-t-3xl w-full max-w-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
            <span className="text-3xl">{transaction.type == 1 ? <Plus  size={20}/> : <ArrowDown  size={20}/> }</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{transaction.type == 1 ? 'Deposit for ' + transaction.package_name : 'Withdrawal'}</h3>
           </div>
        </div>
        <div className={` rounded-xl p-4 mb-4 font-semibold ${transaction.type == 1 ? 'bg-green-500' : 'bg-red-500'}`}>
           <span className={`font-semibold text-white`}>
                {transaction.type == 1 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </span>
        </div>
         <p className="text-gray-500 mb-4">Transaction no.</p>
        <p className="font-mono text-sm mb-4">{transaction.created_at}</p>
        <button className="text-red-500 w-full py-2 border border-red-500 rounded-lg" onClick={onClose}>
          Report a problem
        </button>
        <button className="text-blue-500 w-full py-2 mt-2" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
};

const History = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { userData, loading , jwt, UserTransactions} = useUserData(); // Access the user data and loading state
  
  console.log(UserTransactions)
  if (loading) {
      return <div className="flex justify-center items-center h-screen text-white">Loading...</div>; // Display loading state
  }

  const transactions = [
    { name: 'Earning', date: 'Today 12:32', amount: -35.23, icon: <Plus  size={20}/>, transactionNo: '230104124324314' },
    { name: 'Top up', date: 'Yesterday 02:12', amount: 430.00, icon: <Plus  size={20}/>, transactionNo: '230104124324315' },
    { name: 'Referral', date: 'Dec 24 13:53', amount: 13.00, icon: <Link2  size={20}/>, transactionNo: '230104124324316' },
  ];

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Latest Transactions</h3>
          <Link to={'/history'} className="text-indigo-600 text-sm">View all</Link>
        </div>
        {UserTransactions && UserTransactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-2" onClick={() => setSelectedTransaction(transaction)}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg">{transaction.type == 1 ? <Plus  size={20}/> : <ArrowDown  size={20}/> }</span>
              </div>
              <div>
                <p className="font-semibold text-sm">{transaction.type == 1 ? 'Deposit' : 'Withdrawal'}</p>
                <p className={`text-xs  ${transaction.status == 0 ? 'text-orange-500' : transaction.status == 1 ? 'text-green-500' : 'text-red-500'} `}>{transaction.status == 0 ? 'Pending' : transaction.status == 1 ? 'Successful' : 'Failed'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`font-semibold ${transaction.type == 1 ? 'text-green-500' : 'text-red-500'}`}>
              {transaction.type === 1 ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <ArrowUp className="w-4 h-4 ml-2 transform rotate-45" />
            </div>
          </div>
        ))}
      </div>

      {selectedTransaction && (
        <TransactionPopup
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
};

export default History;
