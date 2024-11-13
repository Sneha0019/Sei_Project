import "../src/style.css";
import ProductState from "./context/products/ProductState";
import Product from "./components/Product";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddtoWishlist from "./components/AddtoWishlist";
import SellerDashboard from "./components/SellerDashboard";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Addtocart from "./components/Addtocart";
import OrderState from "./context/orders/OrderState";
import WishlistState from "./context/wishlists/WishlistState";
import Footer from "./components/Footer";
import ManageProducts from "./components/ManageProducts";
import AdminDashboard from "./components/AdminDashboard";
import SellerVerification from "./components/SellerVerification";
import ReportAdmin from "./components/ReportAdmin";

function App() {
  const bgColor = "#FFE7E7";
  const txtColor = "#6D2932";

  return (
    <>
      <WishlistState>
        <OrderState> 
          <ProductState>
            <BrowserRouter>
              {/* Conditionally render Navbar and Footer */}
              <Routes>
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar bgColor={bgColor} txtColor={txtColor} />
                      <div className="container-fluid">
                        <Routes>
                          <Route exact path="/" element={<Home />} />
                          <Route exact path="/bag" element={<Product />} />
                          <Route exact path="/dupatta" element={<Product />} />
                          <Route exact path="/saree" element={<Product />} />
                          <Route exact path="/festive" element={<Product />} />
                          <Route exact path="/jewellery" element={<Product />} />
                          {/* <Route exact path="/necklace" element={<Product />} />
                          <Route exact path="/anklets" element={<Product />} /> */}
                          <Route exact path="/signup" element={<Signup bgColor={bgColor} txtColor={txtColor} />} />
                          <Route exact path="/login" element={<Login bgColor={bgColor} txtColor={txtColor} />} />
                          <Route exact path="/productdetails" element={<ProductDetails bgColor={bgColor} txtColor={txtColor} />} />
                          <Route exact path="/addtocart" element={<Addtocart bgColor={bgColor} txtColor={txtColor} />} />
                          <Route exact path="/wishlist" element={<AddtoWishlist bgColor={bgColor} txtColor={txtColor} />} />
                        </Routes>
                      </div>
                      <Footer bgColor={bgColor} txtColor={txtColor} />
                    </>
                  }
                />
                <Route exact path="/sellerDashboard" element={<SellerDashboard />} />
                <Route exact path="/manageProducts" element={<ManageProducts />} />

                <Route exact path="/adminDashboard" element={<AdminDashboard/>} />
                <Route exact path="/manageSellers" element={<SellerVerification />} />
                <Route exact path="/manageReports" element={<ReportAdmin />} />
                
              </Routes>
            </BrowserRouter>
          </ProductState>  
        </OrderState>  
      </WishlistState>
    </>
  );
}

export default App;
