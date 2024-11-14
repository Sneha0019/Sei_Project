import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaProductHunt, FaUserCog, FaShoppingBag, FaBars, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null); // Store the ID of the product being edited
  const navigate = useNavigate();

  const sellerId = localStorage.getItem("sellerId");


  console.log("selllllller", localStorage.getItem("sellerId"));

  const [newProduct, setNewProduct] = useState({
    imageUrl: '',
    productName: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    material: '',
    weight: '',
    dimension: '',
    sellerId: sellerId
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentUserRole = localStorage.getItem('currentUserRole');
    
    if (!token || currentUserRole !== 'seller') {
      alert("page doesn't exist")
      navigate('/'); // Redirect to login if not authenticated or not a seller
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      handleEdit(); // Call handleEdit if in edit mode
    } else {
      try {
        console.log("sending product...");
        const response = await fetch('http://localhost:5000/api/products/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        console.log("send data ", data);
        setProducts([...products, data]);
        resetForm();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/updateproduct/${editProductId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(product => (product._id === editProductId ? updatedProduct : product))); // Update the state with the modified product
        resetForm();
      } else {
        console.error('Failed to update product:', await response.text());
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      imageUrl: '',
      productName: '',
      description: '',
      price: '',
      category: '',
      stockQuantity: '',
      material: '',
      weight: '',
      dimension: '',
      sellerId: sellerId
    });
    setFormOpen(false);
    setEditMode(false);
    setEditProductId(null); // Reset the edit product ID
  };

  const handleDelete = async (index) => {
    const productId = products[index]._id; // Get the product ID to delete
    try {
      const response = await fetch(`http://localhost:5000/api/products/deleteproduct/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedProducts = products.filter((_, i) => i !== index); // Remove the deleted product from the state
        setProducts(updatedProducts); // Update the state
      } else {
        console.error('Failed to delete product:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product) => {
    setNewProduct(product); // Set the current product data for editing
    setEditProductId(product._id); // Set the ID of the product being edited
    setEditMode(true); // Enable edit mode
    setFormOpen(true); // Open the form
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#6D2932',
    padding: '20px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    color: 'white',
  };

  const mainContentStyle = {
    marginLeft: '250px',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#f8f9fa',
  };

  const modalStyle = {
    display: formOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1000,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: 'white',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  const thStyle = {
    backgroundColor: '#6D2932',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const buttonStyle = {
    backgroundColor: '#6D2932',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    marginRight: '5px',
  };

  const hoverButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#7A2C3C',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/fetchallproducts');
        const data = await response.json();
  
        // Get the current seller's sellerId from localStorage
        const currentSellerId = localStorage.getItem('sellerId');
  
        if (!currentSellerId) {
          console.error('Seller ID not found in localStorage');
          return;
        }
  
        // Filter products based on the current sellerId
        const filteredProducts = data.product.filter(product => product.sellerId === sellerId);
  
        // Set filtered products to state
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={mainContentStyle}>
        <button onClick={() => setFormOpen(true)} style={buttonStyle}>
          <FaPlus /> Add Product
        </button>

        {/* Product Form Modal */}
        <div style={modalStyle}>
          <h2>{editMode ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={newProduct.productName}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              value={newProduct.stockQuantity}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="material"
              placeholder="Material"
              value={newProduct.material}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="weight"
              placeholder="Weight"
              value={newProduct.weight}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="dimension"
              placeholder="Dimension"
              value={newProduct.dimension}
              onChange={handleInputChange}
              required
              style={{ margin: '5px 0', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={buttonStyle}>
              {editMode ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={resetForm} style={buttonStyle}>
              Cancel
            </button>
          </form>
        </div>

        {/* Product Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
  {products.map((product, index) => (
    <tr key={product._id || index}> {/* Use _id or index as fallback */}
      <td style={tdStyle}>
        <img src={product.imageUrl} alt={product.productName} style={{ width: '50px', height: '50px' }} />
      </td>
      <td style={tdStyle}>{product.productName}</td>
      <td style={tdStyle}>{product.description}</td>
      <td style={tdStyle}>{product.price}</td>
      <td style={tdStyle}>{product.category}</td>
      <td style={tdStyle}>{product.stockQuantity}</td>
      <td style={tdStyle}>
        <button onClick={() => handleEditClick(product)} style={buttonStyle}>
          <FaEdit />
        </button>
        <button onClick={() => handleDelete(index)} style={buttonStyle}>
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
