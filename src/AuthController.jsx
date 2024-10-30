import axios from 'axios';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Universal authentication controller
export const AuthController = {
  // Register a new user
  registerUser: async (userData) => {
    const alert = useAlert();
    try {
      const response = await axios.post(`${baseUrl}/register`, userData);

      if (response.data.status == 1) {
        // Save JWT and refresh token in cookies
        Cookies.set('jwt', response.data.jwt, { expires: 7 });
        Cookies.set('refresh_token', response.data.refresh_token, { expires: 7 });

        alert.show('Registration successful', { type: 'success' });
        return response.data;
      } else {
        alert.show('Registration failed. Please try again.', { type: 'error' });
        return null;
      }
    } catch (error) {
      alert.show('An error occurred during registration. Please try again.', { type: 'error' });
      console.error('Registration error:', error);
    }
  },

  // Login user
  loginUser: async (credentials) => {
    const alert = useAlert();
    try {
      const response = await axios.post(`${baseUrl}/login`, credentials);

      if (response.data.status == 1) {
        // Save JWT and refresh token in cookies
        Cookies.set('jwt', response.data.jwt, { expires: 7 });
        Cookies.set('refresh_token', response.data.refresh_token, { expires: 7 });

        alert.show('Login successful', { type: 'success' });
        return response.data;
      } else {
        alert.show('Login failed. Please check your credentials.', { type: 'error' });
        return null;
      }
    } catch (error) {
      alert.show('An error occurred during login. Please try again.', { type: 'error' });
      console.error('Login error:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return Cookies.get('jwt') ? true : false;
  },

  // Logout user
  logoutUser: () => {
    // Clear the JWT and refresh token
    Cookies.remove('jwt');
    Cookies.remove('refresh_token');
    // Optionally, handle any additional logic like redirecting
  },

  // Get the current authenticated user's token
  getToken: () => {
    return Cookies.get('jwt');
  },
};
