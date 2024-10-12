import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useUserData = () => {
    const [userData, setUserData] = useState(null);  // State to store user data
    const [UserTransactions, setUserTransactions] = useState(null);  // State to store user data
    const [referrals, setreferrals] = useState(null);  // State to store user data
    const [loading, setLoading] = useState(true);    // State for loading
    const navigate = useNavigate();
    
    const jwt = Cookies.get('jwt'); // Get JWT from cookies
    useEffect(() => {

        if (jwt) {
            const fetchData = async () => {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}getUserDetails`, // API endpoint
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${jwt}`, // Pass JWT in the Authorization header
                            },
                        }
                    );
                    if (response.data.status == 1) {
                        setUserData(response.data.data);  // Set user data
                        setUserTransactions(response.data.deposits);  // Set user data
                        setreferrals(response.data.referrals);  // Set user data

                    } else {
                        toast.error(response.data.message);
                        navigate('/logout');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                } finally {
                    setLoading(false);  // Set loading to false after the request completes
                }
            };

            fetchData();
        } else {
            setLoading(false);  // No JWT means no data; finish loading
        }
    }, []);






    return { userData, loading, jwt, UserTransactions, referrals };  // Return both userData and loading state
};

export default useUserData;
