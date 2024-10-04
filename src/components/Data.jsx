import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useUserData = () => {
    const [userData, setUserData] = useState(null);  // State to store user data
    const [UserTransactions, setUserTransactions] = useState(null);  // State to store user data
    const [loading, setLoading] = useState(true);    // State for loading

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
                    setUserData(response.data.data);  // Set user data
                    setUserTransactions(response.data.deposits);  // Set user data
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


    



    return { userData, loading, jwt, UserTransactions };  // Return both userData and loading state
};

export default useUserData;
