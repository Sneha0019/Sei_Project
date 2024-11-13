import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../context/orders/OrderContext";
import WishlistContext from "../context/wishlists/WishlistContext";

const Productitem = (props) => {
  const Ordercontext = useContext(OrderContext);
  const { addInCart } = Ordercontext;

  const Wishlistcontext = useContext(WishlistContext);
  const { addInWishlist, removeFromWishlist, wishlist } = Wishlistcontext;

  const bgColor = "#FFE7E7";
  const txtColor = "#6D2932";
  const { product } = props;

  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState("fa-regular fa-heart");

  // Safe check to ensure wishlist is always an array
  useEffect(() => {
    const productInWishlist = Array.isArray(wishlist) && wishlist.some(item => item.productId === product.productId);
    if (productInWishlist) {
      setIsHeartClicked("fa-solid fa-heart");
    } else {
      setIsHeartClicked("fa-regular fa-heart");
    }
  }, [wishlist, product.productId]);

  const handleClick = () => {
    console.log("going to product details", product);
    navigate('/productdetails', {
      state: { product: product }
    });
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      console.log("Adding product to cart:", product);

      // Optimistic UI update: Update cart immediately
      addInCart(product);

      // Navigate to cart immediately
      navigate("/addtocart");

      // Optionally, you can wait for the actual API response here if needed:
      // const res = await addInCart(product);
      // if (res.success) {
      //   navigate("/addtocart");
      // } else {
      //   console.log("Error adding to cart", res.error);
      // }
    } else {
      navigate("/login");
    }
  }

  const handleWishList = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      if (isHeartClicked === "fa-regular fa-heart") {
        // Add to wishlist
        setIsHeartClicked("fa-solid fa-heart");
        const res = await addInWishlist(product);
        if (res.success) {
          navigate("/wishlist");
        }
      } else {
        // Remove from wishlist
        setIsHeartClicked("fa-regular fa-heart");
        const res = await removeFromWishlist(product.productId);
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="my-3">
      <div className="card shadow-sm" style={{ borderRadius: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Image Section */}
        <img
          src={product.imageUrl}
          className="card-img-top"
          onClick={handleClick}
          style={{
            borderRadius: "2.5rem", 
            cursor: 'pointer', 
            padding: '1rem',
            flexShrink: 0,
            objectFit: 'cover',
            height: '200px'
          }}
          alt="..."
        />
        
        {/* Heart Icon for Wishlist */}
        <i
          onClick={handleWishList}
          className={isHeartClicked}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: '1',
            cursor: 'pointer',
            color: txtColor
          }}
        ></i>
        
        {/* Card Body with Text and Button */}
        <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Product Name */}
          <h5 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>
            {product.productName}
          </h5>
          
          {/* Price */}
          <p className="card-text" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>
            ${product.price}
          </p>
          
          {/* Add to Cart Button */}
          <div className="d-grid gap-2" style={{ marginTop: 'auto' }}>
            <button 
              onClick={handleAddToCart} 
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

export default Productitem;
