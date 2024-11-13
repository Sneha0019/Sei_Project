import React, { useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SellerDashboard from "./SellerDashboard";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const { txtColor } = props;
  const username = localStorage.getItem('username');

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/login"); // Optionally redirect to login after logout
  };

  // Handle Add to Cart Navigation
  const handleClick = (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      navigate("/login");
    } else {
      navigate("/addtocart");
    }
  };

  // Handle Search Input Change
  const onChange = (e) => {
    setQuery(e.target.value); // Update query state for search
  };

  // Handle Seller Dashboard Navigation
 // Handle Seller Dashboard Navigation
const handleClickForSeller = () => {
  const currentUserRole = localStorage.getItem('role'); // Check stored key here
  if (currentUserRole === "seller") {
    navigate("/manageProducts"); // Navigate to Seller Dashboard
  } else {
    navigate("/"); // Redirect elsewhere if not a seller
  }
};


  return (
    <>
      <nav className="navbar navbar-expand-lg p-3" style={{ padding: 0, margin: 0 }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: txtColor }}>
            <big>AritsaHer</big>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-around">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  ALL
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/festive"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  FESTIVE SPECIAL
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/saree"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/saree' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  SAREES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/dupatta"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/dupatta' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  DRESS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/bag"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/bag' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  BAGS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/jewellery"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/jewellery' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  JEWELLERY
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/bangles"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/bangles' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  BANGLES
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/necklace"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/necklace' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  NECKLACE
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/anklets"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/anklets' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  ANKLETS
                </Link>
              </li> */}

              {/* User Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user" style={{ color: txtColor }}></i>
                </Link>
                <ul className="dropdown-menu">
                  {!localStorage.getItem('token') ? (
                    <>
                      <li>
                        <Link style={{ color: txtColor }} className="dropdown-item" to="/login">
                          LOGIN
                        </Link>
                      </li>
                      <li>
                        <Link style={{ color: txtColor }} className="dropdown-item" to="/signup">
                          SIGNUP
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      {username && (
                        <li>
                          <Link
                            style={{ color: txtColor }}
                            onClick={handleClickForSeller}
                            className="dropdown-item"
                          >
                            {username}
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          onClick={handleLogout}
                          style={{ color: txtColor }}
                          className="dropdown-item"
                          to="/"
                        >
                          LOGOUT
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              {/* Wishlist and Cart */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/wishlist"
                  style={{
                    color: txtColor,
                    borderBottom: location.pathname === '/wishlist' ? `2px solid ${txtColor}` : ''
                  }}
                >
                  <i className="fa-solid fa-heart" style={{ color: txtColor }}></i>
                </Link>
              </li>

              <li className="nav-item" onClick={handleClick}>
                <Link className="nav-link active" aria-current="page" to="addtocart">
                  <i className="fa-solid fa-cart-shopping" style={{ color: "#6d2932" }}></i>
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <form className="d-flex" role="search">
              <div
                className="input-group"
                style={{ border: `2px solid ${txtColor}`, borderRadius: 7 }}
              >
                <input
                  onChange={onChange}
                  name="search"
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  style={{ border: 'none', outline: 'none' }}
                />
                <Link to={`/products?search=${query}`} className="btn bg-white border-0"></Link>
                <button className="btn bg-white border-0" type="submit" style={{ outline: 'none' }}>
                  <i className="fa-solid fa-magnifying-glass fa-rotate-by" style={{ color: "#6d2932" }}></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
