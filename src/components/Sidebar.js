import React from 'react'
import { FaTachometerAlt, FaProductHunt, FaUserCog, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Sidebar = () => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#6D2932', // Matching the text color for sidebar background
        padding: '20px',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        color: '#FFE7E7', // Matching the background color for text
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        fontSize: '20px',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)' // Sidebar shadow effect for depth
      };
    
      const linkStyle = {
        marginTop: '10px',
        color: '#FFE7E7', // Sidebar links will match the background color of the rest of the app
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center', // Ensures icon and text are aligned
        gap: '10px', // Adds space between icon and text
        padding: '10px',
        borderRadius: '8px', // Rounded corners for the links
        transition: 'background-color 0.3s ease', // Smooth transition for hover effects
        fontSize: '18px'
      };
    
      const linkHoverStyle = {
        backgroundColor: '#FFDADA',
        color: '#6D2932'
      };

      
  return (
    <div>
      <div style={sidebarStyle}>
        <Link
          to="/sellerDashboard"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
            e.target.style.color = linkHoverStyle.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.color = linkStyle.color;
          }}
        >
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link
          to="/manageProducts"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
            e.target.style.color = linkHoverStyle.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.color = linkStyle.color;
          }}
        >
          <FaProductHunt /> Manage Products
        </Link>
        {/* <Link
          to="/seller/profile"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
            e.target.style.color = linkHoverStyle.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.color = linkStyle.color;
          }}
        >
          <FaUserCog /> Profile Settings
        </Link> */}
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
            e.target.style.color = linkHoverStyle.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '';
            e.target.style.color = linkStyle.color;
          }}
        >
          <FaShoppingBag /> Explore
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
