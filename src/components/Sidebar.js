import React from 'react';
import { FaTachometerAlt, FaProductHunt, FaUserCog, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    // Get the current user role from localStorage
    const currentUserRole = localStorage.getItem('currentUserRole');
    const navigate = useNavigate();


    const handleLogout = () => {
        console.log("came in logout")
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserRole');

        const token = localStorage.getItem('token');

        if(!token){
        navigate("/login"); 
        }
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

    console.log("in sidebar", currentUserRole);

    return (
        <div>
            <div style={sidebarStyle}>
                {currentUserRole === 'seller' ? (
                    // Seller Sidebar
                    <>
                        {/* <Link
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
                        </Link> */}
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
                    </>
                ) : (
                    // Default to Admin Sidebar
                    <>
                        {/* <Link
                            to="/adminDashboard"
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
                        </Link> */}
                        <Link
                            to="/manageSellers"
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
                            <FaUserCog /> Manage Sellers
                        </Link>
                        <Link
                            to="/manageReports"
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
                            <FaUserCog /> Reports
                        </Link>
                        <Link
                          onClick={handleLogout}
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
                          <FaSignOutAlt /> Logout
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
