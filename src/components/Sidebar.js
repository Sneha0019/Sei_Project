import React from 'react';
import { FaTachometerAlt, FaProductHunt, FaUserCog, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const currentUserRole = localStorage.getItem('currentUserRole');
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Came into logout");
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserRole');
        
        navigate("/login");
    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#6D2932',
        padding: '20px',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        color: '#FFE7E7',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        fontSize: '20px',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)',
    };

    const linkStyle = {
        marginTop: '10px',
        color: '#FFE7E7',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        fontSize: '18px',
    };

    const linkHoverStyle = {
        backgroundColor: '#FFDADA',
        color: '#6D2932',
    };

    return (
        <div>
            <div style={sidebarStyle}>
                {currentUserRole === 'seller' ? (
                    <>
                        <Link to="/manageProducts" style={linkStyle}>
                            <FaProductHunt /> Manage Products
                        </Link>
                        <Link to="/" style={linkStyle}>
                            <FaShoppingBag /> Explore
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/manageSellers" style={linkStyle}>
                            <FaUserCog /> Manage Sellers
                        </Link>
                        <Link to="/manageReports" style={linkStyle}>
                            <FaUserCog /> Reports
                        </Link>
                        <button
                            onClick={handleLogout}
                            style={{ backgroundColor:'#FFE7E7', cursor: 'pointer' }}
                            // onMouseEnter={(e) => {
                            //     e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
                            //     e.target.style.color = linkHoverStyle.color;
                            // }}
                            // onMouseLeave={(e) => {
                            //     e.target.style.backgroundColor = '';
                            //     e.target.style.color = linkStyle.color;
                            // }}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
