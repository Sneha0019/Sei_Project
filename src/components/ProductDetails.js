import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Product from './Product';
import OrderContext from '../context/orders/OrderContext';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductDetails = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const { txtColor, bgColor } = props;
  const context = useContext(OrderContext);
  const { addInCart } = context;

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    proofLink: '',
    description: '',
  });

  const [sellerId, setSellerId] = useState(null); // To store the seller's ID

  // Fetch the seller's ID when the component mounts
  useEffect(() => {
    if (product && product.owner) {
      setSellerId(product.owner._id); // Adjust based on your product's schema
    }
  }, [product]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      await addInCart(product);
      navigate('/addtocart');
    } else {
      navigate('/login');
    }
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleReportClose = () => {
    setShowReportModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  // Handle report submission
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    // Create the report data object as per the API structure
    const report = {
      productId: product._id,  // Using the product's _id
      proofLink: reportData.proofLink,  // Proof link from form input
      description: reportData.description,  // Description from form input
    };

    try {
      // Using the fetch API to send a POST request to your backend
      const response = await fetch('http://localhost:5000/api/reports/createreport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(report),  // Sending the report data
      });


      // Check if the response is successful
      if (response.ok) {
        const responseData = await response.json();
        console.log('Report submitted:', responseData);
        alert('Report submitted successfully!'); // Or show success message
        handleReportClose(); // Close the modal after successful submission
      } else {
        const errorData = await response.json();
        console.error('Error submitting report:', errorData);
        alert('Failed to submit the report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit the report. Please try again.');
    }
  };

  return (
    <>
      <div className="container d-flex flex-column flex-md-row mt-5">
        <div className="container text-center mb-3 mb-md-0">
          <img
            src={product.imageUrl || product.productUrl}
            className="img-fluid"
            style={{ maxHeight: '500px', maxWidth: '100%' }}
            alt="Product Image"
          />
        </div>

        <div className="container text-md-left">
          <h3 style={{ borderBottom: `2px solid ${txtColor}`, padding: 4 }}>
            {product.productName}
            {/* Report button */}
            <button
              className="btn btn-danger ms-2"
              onClick={handleReportClick}
              style={{ fontSize: '12px', padding: '3px 8px' }}
            >
              Report <i className="fa-solid fa-flag"></i>
            </button>
          </h3>

          <p>{product.description}</p>

          <div className="row">
            <h3>Product Details</h3>
            <div className="d-flex pt-2 m-0" style={{ borderTop: `2px solid ${txtColor}` }}>
              <p>Weight: {product.weight}</p>
              <p className="mx-2">Dimension: {product.dimension} cm</p>
              <p className="mx-1">Material: {product.material}</p>
            </div>

            <h5>Price - ${product.price}</h5>
            <p>Price inclusive of all taxes.</p>
            <div className="d-flex" style={{ borderBottom: `2px solid ${txtColor}`, padding: 10 }}>
              <a onClick={handleAddToCart} className="btn btn-light btn-lg" href="#" role="button">
                Add to Cart
              </a>
              <a onClick={handleAddToCart} className="btn mx-3 btn-lg" href="#" role="button" style={{ backgroundColor: txtColor, color: '#fff' }}>
                Buy Now
              </a>
            </div>
          </div>

          <ul style={{ listStyleType: 'none', padding: 5 }}>
            <li>
              <i className="fa-regular fa-gem" style={{ color: txtColor }}></i> Purity guaranteed
            </li>
            <li>
              <i className="fa-solid fa-arrow-right-arrow-left" style={{ color: txtColor }}></i> Exchange across all stores
            </li>
            <li>
              <i className="fa-solid fa-box" style={{ color: txtColor }}></i> Free shipping all across India
            </li>
          </ul>
        </div>
      </div>

      {/* Report Modal */}
      <Modal show={showReportModal} onHide={handleReportClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReportSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Proof of Report (Drive Link)</Form.Label>
              <Form.Control
                type="url"
                name="proofLink"
                placeholder="Enter Google Drive link"
                value={reportData.proofLink}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Describe the issue"
                value={reportData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button style={{ backgroundColor: txtColor, color: '#fff' }} type="submit">
              Submit Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Product category={product.category} />
    </>
  );
};

export default ProductDetails;
