import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Importing Recharts components

const SellerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    console.log("AUTH", token);

    if (!token) {
      // If the token doesn't exist, navigate to login page
      navigate('/login');
    }
    
    // You can add additional token validation here if necessary, e.g., using JWT decoding libraries
    // const isValidToken = verifyToken(token); // Example function to verify token
    // if (!isValidToken) {
    //   navigate('/login');
    // }

  }, [navigate]);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const contentStyle = {
    marginLeft: '250px', // To make space for the sidebar
    padding: '20px',
    width: 'calc(100% - 250px)', // Dynamic width minus sidebar
    backgroundColor: '#ffffff', // Using the main app background color
    color: '#6D2932' // Using the main text color
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#FFE7E7', // Ensuring the container uses the app's background color
    flexWrap: 'wrap' // Responsive design to allow wrapping on smaller screens
  };

  const cardStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '800px'
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div style={contentStyle}>
        <h1>Welcome to the Seller Dashboard</h1>
      </div>
    </div>
  );
};

export default SellerDashboard;
