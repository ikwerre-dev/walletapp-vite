import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';
import Header from '../components/Header';

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState(''); // New state for current password
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const jwt = Cookies.get('jwt'); // Get JWT from cookies

    
    const handlePasswordChange = async () => {
        // Basic validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        try {
            setLoading(true);
            // Make API call to change password
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}change-password`,
                {
                    currentPassword: currentPassword, // Send current password to API
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`, // Pass JWT in the Authorization header
                    },
                }
            );

            // console.log(response.data);
            if (response.data.status == 1) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error("An error occurred while changing the password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen mb-[5rem] bg-[#270685] text-white">
            <Header />

            <div className="bg-white text-black p-4 px-6 rounded-t-3xl mt-4 flex-grow">
                <h3 className="font-bold mb-4">Settings</h3>
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-4">

                        <hr className="my-3" />
                        {/* Current Password Input */}
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">Current Password</h3>
                            <input
                                type="password"
                                placeholder="Enter Current Password"
                                className="border p-2 text-xs w-full rounded-lg outline-none"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        
                        <hr className="my-3" />
                        {/* New Password Input */}
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">New Password</h3>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                className="border p-2 text-xs w-full rounded-lg outline-none"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        
                        <hr className="my-3" />
                        {/* Confirm Password Input */}
                        <div className="flex flex-col justify-between gap-2 mb-2">
                            <h3 className="text-gray-600 text-xs">Confirm New Password</h3>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="border p-2 text-xs w-full rounded-lg outline-none"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="w-full px-4 py-2 mt-4 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handlePasswordChange}
                            disabled={loading}
                        >
                            {loading ? "Changing Password..." : "Change Password"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
