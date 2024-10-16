import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RecoverPassword from './pages/RecoverPassword';
import Footer from './pages/Footer';
import Earn from './pages/Earn';
import History from './pages/History';
import More from './pages/More';
import NotFound from './pages/NotFound';
import Deposit from './pages/Deposit';
import ShareButton from './pages/Splash';
import Withdraw from './pages/Withdraw';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import Reset from './pages/Reset';
// const jwt = Cookies.get('jwt'); // Check if JWT exists

const PrivateRoute = ({ element }) => {
  const jwt = Cookies.get('jwt'); // Check if JWT exists
  // console.log(jwt)
  return jwt ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
  const jwt = Cookies.get('jwt'); // Check if JWT exists
  return jwt ? <Navigate to="/" replace /> : element;
};


const App = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
        <Route path="/r/:data" element={<PublicRoute element={<Signup />} />} />
        <Route path="/reset/:data" element={<PublicRoute element={<Reset />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/forgot-password" element={<PublicRoute element={<RecoverPassword />} />} />

        <Route path="/earn" element={<PrivateRoute element={<Earn />} />} />
        <Route path="/splash" element={<PrivateRoute element={<ShareButton />} />} />
        <Route path="/deposit" element={<PrivateRoute element={<Deposit />} />} />
        <Route path="/withdraw" element={<PrivateRoute element={<Withdraw />} />} />
        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
        <Route path="/history" element={<PrivateRoute element={<History />} />} />
        <Route path="/more" element={<PrivateRoute element={<More />} />} />

        {/* Logout route */}
        <Route path="/logout" element={<Logout />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!['/login', '/signup'].includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
