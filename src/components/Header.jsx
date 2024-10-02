import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import Cookies from 'js-cookie'; // Import Cookies to get JWT
import userImage from '../assets/user.png';
import cardBg from '../assets/card-bg.png';
import axios from 'axios';

const Header = () => {
    const [userData, setUserData] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true);   // State for loading
    const [name, setname] = useState(true);   // State for loading


    useEffect(() => {
        const jwt = Cookies.get('jwt');

        if (jwt) {

            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}getUserDetails`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        }
                    );
                    setUserData(response.data.data)
                    setLoading(false)
                    console.log(response.data.data)



                } catch (error) {
                    console.error('Error fetching events:', error);
                    setLoading(false);
                }
            };

            fetchData();

        }
    }, []);



    return (
        <header className="flex justify-between sticky z-40 top-0 bg-[#270685] items-center p-4">
            <div className="flex items-center space-x-3">
                <img src={userImage} alt="User" className="w-10 h-10 rounded-full" />
                <div>

                    <p className="text-xs opacity-80">Hello,</p>
                    {loading ? (
                        <p className="text-xs opacity-80"> </p>
                    ) : (
                        <>
                            <h1 className="text-sm font-bold">{userData?.first_name || 'User'}!</h1>
                        </>
                    )}



                </div>
            </div>
            <Link to='/settings' className="p-2">
                <Settings className="w-6 h-6" />
            </Link>
        </header>
    );
};

export default Header;
