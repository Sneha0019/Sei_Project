import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../context/wishlists/WishlistContext";
import OrderContext from "../context/orders/OrderContext";

const Wishlistitem = (props) => {

  const Ordercontext = useContext(OrderContext);
  const { addInCart } = Ordercontext;

  const Wishlistcontext = useContext(WishlistContext);
  const { removefromwishlist } = Wishlistcontext;

  const bgColor = "#FFE7E7";
  const txtColor = "#6D2932";
  const { wishlistProduct } = props;
  const product = wishlistProduct.items[0];

  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState("fa-solid fa-heart");

  const handleClick = () => {
    console.log("going to product details", product);
    navigate('/productdetails', {
      state: { product: product }
    });
  }

  const handleWishList = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      if (isHeartClicked === "fa-solid fa-heart") {
        const res = await removefromwishlist(wishlistProduct._id);
      }
      navigate("/wishlist");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="my-3">
      <div className="card shadow-sm" style={{ borderRadius: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Image Section */}
        <img
          src={wishlistProduct.items[0].productUrl}
          className="card-img-top"
          onClick={handleClick}
          style={{
            borderRadius: "2.5rem",
            cursor: 'pointer',
            padding: '1rem',
            flexShrink: 0,
            objectFit: 'cover', // Ensures the image fully covers the space
            height: '200px' // Fixed height for the image
          }}
          alt="..."
        />
        
        {/* Heart Icon for Wishlist */}
        <i
          onClick={handleWishList}
          className={isHeartClicked}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1', cursor: 'pointer', color: txtColor }}
        ></i>
        
        {/* Card Body with Text and Button */}
        <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Product Name */}
          <h5 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>
            {wishlistProduct.items[0].productName}
          </h5>
          
          {/* Price */}
          <p className="card-text" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>
            ${wishlistProduct.items[0].price}
          </p>
          
          {/* Add to Cart Button */}
          <div className="d-grid gap-2" style={{ marginTop: 'auto' }}>
            <button 
              className="btn" 
              type="button" 
              style={{ backgroundColor: bgColor, color: txtColor }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlistitem;
