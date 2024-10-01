import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RecoverPassword from './pages/RecoverPassword';
import Footer from './pages/Footer';

const App = () => {
  useEffect(() => {
     const lenis = new Lenis({
      duration: 10.2,  
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  
      smooth: true,
      direction: 'vertical',  
    });

     const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

     return () => {
      lenis.destroy();
    };
  }, []);
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<RecoverPassword />} />
      </Routes>
      {location.pathname === '/' && <Footer />}
    </>
  );
};

export default App;
