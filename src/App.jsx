import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
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
const App = () => {

  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/more" element={<More />} />
        <Route path="/forgot-password" element={<RecoverPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {['/login', '/signup'].includes(location.pathname) ? '' : <Footer />}
    </>
  );
};

export default App;
