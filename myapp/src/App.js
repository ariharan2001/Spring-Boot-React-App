import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Rating from './pages/Rating';
import Ratings from './pages/Ratings';
import Success from './pages/Success';
import Login from './pages/Login';
import Signup from './pages/Singup';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import PrivateRoute from './component/PrivateRoute';


function App() {

  const [isOutline, setIsOutline] = useState(true);

  return (
        <Router>
          { isOutline && <Navbar />}
          <MainRoutes setIsOutline={setIsOutline} />
          { isOutline && <Footer />}
        </Router>
  );
}

function MainRoutes({setIsOutline}) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname ==="/signup") setIsOutline(false)
    else setIsOutline(true)
  }, [location.pathname]);

  return (
    
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    
  );
}

export default App;
