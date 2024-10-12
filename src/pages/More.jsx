import React from 'react';
import { Settings, ArrowUp, ArrowDown, RefreshCw, Home, Clock, CreditCard, MoreHorizontal, Link2, Plus, User2, Settings2, Info, LogOut, HistoryIcon } from 'lucide-react';
import user from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


const More = () => {
    const MenuItem = ({ icon, label, link }) => {
        return (
            <Link to={link} className="flex  items-center p-4 bg-gray-200   rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="mr-2 text-gray-600">{icon}</div>
                <span className="text-gray-800">{label}</span>
            </Link>
        );
    };

    return (
        <div className="flex flex-col  mb-[5rem] bg-[#270685] text-white">
            <Header /> 

            <div className="bg-white text-black p-4 shadow-lg rounded-t-3xl mt-4 flex-grow">


                <div className="mb-4">
                    <div className=" p-4 w-full">
                        <div className="space-y-2">
                            <MenuItem icon={<Home />} link='/' label="Home" />
                            <MenuItem icon={<ArrowUp />} link='/deposit' label="Deposit" />
                            <MenuItem icon={<ArrowDown />} link='/withdraw' label="Withdraw" />
                            <MenuItem icon={<Plus />} link='/earn' label="Earn" />
                            <MenuItem icon={<HistoryIcon />} link='/history' label="History" />
                            <MenuItem icon={<Settings2 />} link='/settings' label="Change Password" />
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>
                        <div className="space-y-2">

                        <MenuItem icon={<Settings2 />} link='sms:+15512270514&body=Hello Support, My ID is #123232,' label="Contact Support" />

                        <MenuItem icon={<LogOut />} link='/logout' label="Logout" />
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default More;