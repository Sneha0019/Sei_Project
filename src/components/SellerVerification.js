import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const SellerVerification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch seller data from the API
    const fetchSellers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getseller', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        console.log("Data fetched:", data);

        // Check if data has user array, then filter sellers where validSeller is "false"
        if (data.user) {
          const pendingRequests = data.user.filter(seller => seller.validSeller === "false");
          setRequests(pendingRequests);
          console.log("Pending requests:", pendingRequests);
        }

      } catch (error) {
        console.error("Error fetching seller data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Function to handle accept action
  const handleAccept = async (id) => {
    try {
      // Send a request to the backend to update validSeller to true
      const response = await fetch(`http://localhost:5000/api/auth/updateseller/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ validSeller: "true" })
      });

      if (response.ok) {
        // Remove the seller from the table if the backend update was successful
        setRequests(requests.filter(request => request._id !== id));
        console.log("Seller accepted and removed from list");
      } else {
        console.error("Error updating seller status");
      }
    } catch (error) {
      console.error("Error updating seller data:", error);
    }
  };

  // Function to handle reject action
  const handleReject = (id) => {
    // Update the seller status here (e.g., send a request to update the backend)
    setRequests(requests.filter(request => request._id !== id));
  };

  // Helper function to shorten URLs
  const getShortenedLink = (url) => {
    const maxLength = 30; // Adjust the maximum length of displayed text as needed
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '20px', width: '100%' }}>
        <h2>Seller Verification</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No pending seller verification requests.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Name</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Email</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Aadhaar Card</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Portfolio Link</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((seller) => (
                <tr key={seller._id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{seller.name}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{seller.email}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    {seller.aadharCardLink ? (
                      <a 
                        href={seller.aadharCardLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={seller.aadharCardLink} // Tooltip for full Aadhaar link
                      >
                        {getShortenedLink(seller.aadharCardLink)}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    {seller.portfolio ? (
                      <a 
                        href={seller.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={seller.portfolio} // Tooltip for full portfolio link
                      >
                        {getShortenedLink(seller.portfolio)}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    <button 
                      onClick={() => handleAccept(seller._id)} 
                      style={{ marginRight: '10px', padding: '5px 10px', color: 'white', backgroundColor: 'green', border: 'none', borderRadius: '5px' }}
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleReject(seller._id)} 
                      style={{ padding: '5px 10px', color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerVerification;
