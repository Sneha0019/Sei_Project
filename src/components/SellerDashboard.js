import React from 'react';
import Sidebar from './Sidebar';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts'; // Importing Recharts components

const SellerDashboard = () => {
  // Sample data for charts
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4000 },
    { name: 'May', sales: 3000 },
    { name: 'Jun', sales: 2000 }
  ];

  const productData = [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 300 },
    { name: 'Product D', value: 200 }
  ];

  const ordersData = [
    { name: 'Order 1', value: 3000 },
    { name: 'Order 2', value: 2000 },
    { name: 'Order 3', value: 4000 },
    { name: 'Order 4', value: 1000 }
  ];

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
      
       <Sidebar/>

      {/* Content Area */}
      <div style={contentStyle}>
        <h1>Welcome to the Seller Dashboard</h1>

        {/* Sales Chart */}
        <div style={cardStyle}>
          <h3>Sales Over Time</h3>
          <LineChart width={600} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Product Performance Pie Chart */}
        {/* <div style={cardStyle}>
          <h3>Product Performance</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={productData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#82ca9d"
              paddingAngle={5}
              dataKey="value"
            >
              {productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div> */}

        {/* Recent Orders Bar Chart */}
        
      </div>
    </div>
  );
};

export default SellerDashboard;
