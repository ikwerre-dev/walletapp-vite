import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Camera, Clipboard, Info } from 'lucide-react';
import BalanceCard from '../components/BalanceCard';
import { toast } from 'react-toastify';
import { QRCode } from 'react-qr-code'; // Import the QRCode component
import { Link } from 'react-router-dom';
const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', color: 'bg-orange-500', qr: true, data: "Btc13084h3niw7r9r34n", instruction: "Pay to this wallet" },
    { symbol: 'UDST', name: 'Usdt', color: 'bg-orange-500', qr: true, data: "Btc13084h3niw7r9r34n", instruction: "Pay to this wallet" },
    { symbol: 'PAYPAL', name: 'Paypal', color: 'bg-blue-500', qr: false, data: "me@gmail.com", instruction: "Pay to family and friends" },
    { symbol: 'CASH APP', name: 'Cash App', color: 'bg-green-500', qr: false, data: "Btc13084h3niw7r9r34n", instruction: "Pay to this wallet" },

];


function App() {
    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
    const [isKeypadModalOpen, setisKeypadModalOpen] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [IntiatePaymentModal, setIntiatePaymentModal] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const openPaymentMethodModal = () => setIsPaymentMethodModalOpen(true);
    const closePaymentMethodModal = () => setIsPaymentMethodModalOpen(false);

    const openIntiatePaymentModal = () => {
        toast.info("Your Payment is being processed");
        setIntiatePaymentModal(true);
    };
    const closeIntiatePaymentModal = () => setIntiatePaymentModal(false);


    const openScanner = () => setIsScannerOpen(true);
    const closeScanner = () => setIsScannerOpen(false);
    const handleScan = (data) => {
        if (data) {
            console.log(data[0].rawValue); // Corrected the access to data[0]
            setWalletAddress(data[0].rawValue); // Ensure this is how your data is structured
            closeScanner();
        }

    };

    // Handle scan errors
    const handleError = (err) => {
        console.error(err);
        alert('Error: ' + err);
    };

    const getquote = () => {
        if (amount < 10) {
            toast("Atleast a minimum of $10 is needed!");
            return;
        }

        openPaymentMethodModal();

    }


    const openKeypadModal = () => setisKeypadModalOpen(true);
    const closeKeypadModal = () => setisKeypadModalOpen(false);

    const openCurrencyModal = () => setIsCurrencyModalOpen(true);
    const closeCurrencyModal = () => setIsCurrencyModalOpen(false);

    const selectCrypto = (crypto) => {
        setSelectedCrypto(crypto);
        closeModal();
    };

    const handleKeyPress = (key) => {
        if (key === 'backspace') {
            setAmount(prev => prev.slice(0, -1));
        } else if (key === '.') {
            if (!amount.includes('.')) {
                setAmount(prev => prev + key);
            }
        } else {
            setAmount(prev => prev + key);
        }
    };
    const CompleteKeypad = (amount) => {
        // alert(amount)
        amount < 1 ? amount = 0 : amount;
        const formattedAmount = parseFloat(amount).toFixed(2);
        setAmount(formattedAmount);
        closeKeypadModal();
    };
    const [selectedMethod, setSelectedMethod] = useState('Credit Card');

    const paymentMethods = [

    ];

    const PaymentMethod = ({ name, providers, qr, data, instruction, isSelected, onClick }) => {
        // Function to handle copy to clipboard
        const handleCopy = () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(data)
                    .then(() => {
                        toast.success("Copied to Clipboard!");
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        toast.error("Failed to copy!");
                    });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = data;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand("copy");
                    toast.success("Copied to Clipboard!");
                } catch (err) {
                    console.error('Failed to copy: ', err);
                    toast.error("Failed to copy!");
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        };
        

        return (
            <div
                className="flex border border-sm rounded-2xl border-blue-200 items-center py-5 px-6 cursor-pointer"
                onClick={onClick}
            >
                <div className="flex-grow">
                    <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>{name}</p>

                    <div className="items-center flex justify-center mt-5">
                        {qr && (
                            <div className="mt-2">
                                <QRCode value={data} size={100} />
                            </div>
                        )}
                    </div>
                    <p onClick={handleCopy} className="text-sm flex justify-between text-black mt-5">
                        {data}
                        <button  className="flex items-center">
                            <Clipboard size={15} />
                        </button>
                    </p>
                    <p className='text-xs my-3 flex gap-2 text-gray-500'><Info size={15} /> {instruction}</p>
                </div>
            </div>
        );
    };

    const renderInputFields = () => {
        switch (selectedMethod) {
            case 'Credit Card':
            case 'Debit Card':
                return (
                    <>
                        <input className="w-full p-2 border rounded" placeholder="Card Number" />
                        <div className="flex space-x-2">
                            <input className="w-1/2 p-2 border rounded" placeholder="MM/YY" />
                            <input className="w-1/2 p-2 border rounded" placeholder="CVV" />
                        </div>
                        <input className="w-full p-2 border rounded" placeholder="Cardholder Name" />
                    </>
                );
            case 'Bank Transfer':
                return (
                    <>
                        <input className="w-full p-2 border rounded" placeholder="Account Number" />
                        <input className="w-full p-2 border rounded" placeholder="Routing Number" />
                        <input className="w-full p-2 border rounded" placeholder="Account Holder Name" />
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">

            {!isKeypadModalOpen ? <BalanceCard type={2} /> : ''}

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Deposit</h3>
                <div className=" h-100 grid relative overflow-hidden">
                    <div className="relative p-2 h-[40rem]">
                        <h2 className="text-sm font-semibold mb-2">Select Deposit Method{' '} <span className="text-blue-500">*</span></h2>

                        <div
                            className="bg-gray-100 rounded-lg p-4 mb-5 flex items-center justify-between cursor-pointer"
                            onClick={openModal}
                        >
                            <div className="flex items-center">
                                <div className={`${selectedCrypto.color} text-white rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                                    {selectedCrypto.symbol[0]}
                                </div>
                                <span className="font-semibold">{selectedCrypto.name} ({selectedCrypto.symbol})</span>
                            </div>
                            <ChevronRight className="text-gray-400" />
                        </div>

                        <h2 className="text-sm font-semibold mb-2"> Amount{' '} <span className="text-blue-500">*</span></h2>

                        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
                            <input
                                type="text"
                                value={'$' + (amount || '0.00')}
                                onClick={openKeypadModal}
                                readOnly={true}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-transparent text-l font-semibold w-full outline-none"
                            />
                            {/* <div className="flex items-center">
                                <button
                                    onClick={openCurrencyModal}
                                    className="flex items-center text-blue-500"
                                >
                                    <span className="mr-2 bg-blue-200 p-2 rounded-lg font-bold text-xs">{selectedCurrency}</span>
                                    <ChevronRight className="text-gray-400" />
                                </button>
                            </div> */}
                        </div>



                        <button onClick={getquote} className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
                            Deposit
                        </button>

                        {/* Crypto Modal */}
                        <div className={`absolute inset-0 bg-white transform transition-transform z-50 duration-300 ease-in-out ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="p-4 h-full overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">Select Payment Method</h3>
                                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {cryptos.map((crypto) => (
                                        <div
                                            key={crypto.symbol}
                                            className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={() => selectCrypto(crypto)}
                                        >
                                            <div className={`${crypto.color} text-white rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                                                {crypto.symbol[0]}
                                            </div>
                                            <span>{crypto.name} ({crypto.symbol})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`absolute inset-0 bg-white transform transition-transform z-50 duration-300 ease-in-out ${isPaymentMethodModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="p-4 h-full overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">Make Deposit</h3>
                                    <button onClick={closePaymentMethodModal} className="text-gray-500 hover:text-gray-700">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-2 mt-[2rem]">
                                    <PaymentMethod
                                        key={selectedCrypto.name}
                                        name={selectedCrypto.name}
                                        qr={selectedCrypto.qr}
                                        data={selectedCrypto.data}
                                        instruction={selectedCrypto.instruction}
                                        providers={selectedCrypto.name}
                                        isSelected={selectedMethod === selectedCrypto.name}
                                        onClick={() => setSelectedMethod(selectedCrypto.name)}
                                    />

                                </div>
                                <button
                                    className="w-full bg-blue-600 text-white py-3 mt-3 rounded-lg font-semibold"
                                    onClick={() => openIntiatePaymentModal()}
                                >
                                    I have Paid
                                </button>
                            </div>
                        </div>

                        {/* Bank Detaills Modal */}
                        <div className={`absolute inset-0 bg-white transform transition-transform z-50 duration-300 ease-in-out ${IntiatePaymentModal ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="p-4 h-full overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">{selectedCrypto.name} Payment</h3>
                                    <button onClick={closeIntiatePaymentModal} className="text-gray-500 hover:text-gray-700">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-2 mt-[2rem]">
                                    <p>Your Deposit is being processed, Please await confirmation</p>
                                </div>
                                <Link
                                    to="/"
                                   
                                >
                                    <button
                                    className="w-full bg-blue-600 text-white py-3 mt-3 rounded-lg font-semibold"
                                >
                                    Continue
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Keypad Modal */}
                        <div className={`absolute inset-0 bg-white transform transition-transform duration-300 z-50 h-[100%] ease-in-out ${isKeypadModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="p-4 h-full overflow-y-auto">
                                <div className="flex items-center mb-6">
                                    <ChevronLeft className="mr-2 cursor-pointer" onClick={closeKeypadModal} />
                                    <h2 className="text-xl font-semibold">Enter Amount</h2>
                                </div>
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold mb-1">${amount || '0.00'}</div>
                                    <div className="text-gray-500">Amount</div>
                                </div>
                                <div className="flex justify-end mb-6">
                                    <button onClick={openModal} className={`${selectedCrypto.color} bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center`}>
                                        {selectedCrypto.name} <ChevronRight className="ml-1" size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'backspace'].map((key) => (
                                        <button
                                            key={key}
                                            className="bg-gray-100 rounded-lg p-4 text-center text-xl font-semibold"
                                            onClick={() => handleKeyPress(key.toString())}
                                        >
                                            {key === 'backspace' ? '⌫' : key}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
                                    onClick={() => CompleteKeypad(amount)}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>

                        <div className={`absolute inset-0 bg-white transform transition-transform duration-300 z-40 h-[100%] ease-in-out ${isCurrencyModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div className="p-4 h-full overflow-y-auto">
                                <div className="flex items-center mb-6">
                                    <ChevronLeft className="mr-2 cursor-pointer" onClick={closeCurrencyModal} />
                                    <h2 className="text-xl font-semibold">Select Currency</h2>
                                </div>
                                <div className="space-y-2">
                                    {['USD', 'EUR', 'GBP', 'JPY'].map((currency) => (
                                        <div
                                            key={currency}
                                            className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={() => {
                                                setSelectedCurrency(currency);
                                                closeCurrencyModal();
                                            }}
                                        >
                                            <span className="font-semibold">{currency}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
