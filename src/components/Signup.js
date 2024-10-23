import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const { bgColor, txtColor } = props;

  // Initialize state to include role and seller-specific fields
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    experience: "",
    portfolio: "",
    aadharCardLink: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password, role, phone, address, experience, portfolio, aadharCardLink } = credentials;

    // Sending additional seller-specific data if role is seller
    const bodyData = role === 'seller' 
      ? { name, email, password, role, phone, address, experience, portfolio, aadharCardLink }
      : { name, email, password, role };


      console.log("bodyData..", bodyData);

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData), 
    });

    const json = await response.json();
    console.log(json);

    if (json.success && role === "customer") {
      // Save the auth token and redirect customer
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("username", json.username);
      localStorage.setItem("role", json.role);
      navigate("/");
    } else if (json.success && role === "seller") {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("username", json.username);
      localStorage.setItem("role", json.role);
      navigate("/sellerDashboard");
    } else {
      alert("Please enter proper credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-5 w-50 justify-content-center">
        <h3 className="mb-4 outline-none" style={{ color: txtColor }}>Register Your Account</h3>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input type="text" className="form-control" onChange={onChange} minLength={3} id="name" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} />
          </div>
          
          {/* Dropdown for Role Selection */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select className="form-select" onChange={onChange} id="role" name="role" value={credentials.role}>
              <option value="customer">customer</option>
              <option value="seller">seller</option>
            </select>
          </div>

          {/* Seller-specific fields */}
          {credentials.role === "seller" && (
            <>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" onChange={onChange} id="phone" name="phone" required="true" />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" onChange={onChange} id="address" name="address" required="true" />
              </div>
              <div className="mb-3">
                <label htmlFor="experience" className="form-label">Years of Experience</label>
                <input type="number" className="form-control" onChange={onChange} id="experience" name="experience" required="true" />
              </div>
              <div className="mb-3">
                <label htmlFor="portfolio" className="form-label">Portfolio (PDF link)</label>
                <input type="url" className="form-control" onChange={onChange} id="portfolio" name="portfolio" required="true" />
              </div>
              <div className="mb-3">
                <label htmlFor="aadharCardLink" className="form-label">Government ID (Aadhar card Drive Link)</label>
                <input type="url" className="form-control" onChange={onChange} id="aadharCardLink" name="aadharCardLink" required="true" />
              </div>
            </>
          )}

          <div className='mb-3'>
            <a style={{ color: txtColor }} href="/login" className="btn-link" role="button" aria-disabled="true">Already have an account?</a>
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: bgColor, color: txtColor }}>Create Account</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
