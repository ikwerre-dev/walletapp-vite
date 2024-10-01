import React, { useState } from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import Header from '../components/Header';

const TransactionPopup = ({ transaction, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
            <img src={transaction.icon} alt={transaction.name} className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{transaction.name}</h3>
            <p className="text-gray-500">Retailer corporation</p>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 mb-4">
          <p className="text-red-500 text-2xl font-bold">-${Math.abs(transaction.amount).toFixed(2)}</p>
        </div>
        <p className="text-gray-500 mb-2">{transaction.date}</p>
        <p className="text-gray-500 mb-4">Transaction no.</p>
        <p className="font-mono text-sm mb-4">{transaction.transactionNo}</p>
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

  const transactions = [
    { name: 'Walmart', date: 'Today 12:32', amount: -35.23, icon: '🛒', transactionNo: '230104124324314' },
    { name: 'Top up', date: 'Yesterday 02:12', amount: 430.00, icon: '💳', transactionNo: '230104124324315' },
    { name: 'Netflix', date: 'Dec 24 13:53', amount: -13.00, icon: '🎬', transactionNo: '230104124324316' },
  ];

  return (
    <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
      <Header />
      
      <div className="bg-white text-black p-6 px-6 rounded-t-3xl mt-4 flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Latest Transactions</h3>
            <button className="text-indigo-600 text-sm">View all</button>
          </div>
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2" onClick={() => setSelectedTransaction(transaction)}>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">{transaction.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{transaction.name}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <ArrowUp className="w-4 h-4 ml-2 transform rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTransaction && (
        <TransactionPopup
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default History;