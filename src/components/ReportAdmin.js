import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";

const ReportAdmin = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports when the component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reports/getreports', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setReports(data);
        } else {
          console.error('Failed to fetch reports:', data.message);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handle report deletion
  const handleDelete = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/deletereport/${reportId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setReports(reports.filter(report => report._id !== reportId)); // Remove the deleted report from the state
      } else {
        alert(data.message || 'Error deleting report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Error deleting report');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Sidebar />
      </div>

      {/* Content Section */}
      <div style={{ flexGrow: 1, padding: '20px', marginLeft: '0' }}> {/* Removed marginLeft for closer alignment */}
        <h2>Admin - Reports</h2>

        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Proof Link</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>{report.productId.productName}</td> {/* Assuming `productId` has a name field */}
                    <td><a href={report.proofLink} target="_blank" rel="noopener noreferrer">View Proof</a></td>
                    <td>{report.description}</td>
                    <td>{report.status}</td>
                    <td>
                      <button onClick={() => handleDelete(report._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAdmin;
