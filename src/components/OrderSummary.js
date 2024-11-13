import React, { useContext } from 'react'
import OrderContext from '../context/orders/OrderContext';
import {loadStripe} from '@stripe/react-stripe-js'
import axios from 'axios'


const OrderSummary = (props) => {
    const context = useContext(OrderContext)
    const {orders}  = context;
    
     console.log("order summmaryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy...", orders)
     
     let calPrice = 0;
     const caltotalPrice = orders.map((order)=>{
        console.log("total price is",order.totalPrice)
        calPrice += order.totalPrice;
     })

     const deliveryFee = calPrice>1? 0.50: 0;
     
    const {txtColor} = props;

    // const handlePay = async (e) => {
    //     if(!calPrice || calPrice < 1) {
    //       console.error("Please enter calPrice greater than Rs. 1");
    //       return;
    //     }
    //     const currency = "INR";
    //     const response = await fetch("http://localhost:3000/pay", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         calPrice,
    //         currency,
    //       }),
    //     });
    
    //     const order = await response.json();
    
    //     var option = {
    //       key: "",
    //       calPrice,
    //       currency,
    //       name: "sneha",
    //       description: "payment of order",
    //       image:
    //         "https://vjti.ac.in/wp-content/uploads/oldupload/cropped-New-VJTI-Logo_1-1-60x87.jpg",
    //       order_id: order.id,
    //       handler: async function (res) {
    //         window.location.reload();
    //       },
    //     };
    //     var rzp1 = new Razorpay(option);
    //     rzp1.on("payment.failed", function (res) {
    //       alert(res.error.code);
    //     });
    //     rzp1.open();
    //     e.preventDefault();
    //     const formData = {
    //       id: "1",
    //       calPrice: calPrice / 100,
    //     };
    
    //     const formData2 = {
    //       calPrice_donated: calPrice / 100,
    //       user_id: localStorage.getItem("user_id"),
    //       donated_to_id: "1",
    //     };
    

    //   };


  return (
    <>
          <div className="col-md-10 d-flex justify-content-flex-end">
                <div className="container mt-2 flex-end" style={{ backgroundColor: '#f4F3F3', padding:25 }}>
                    <h4 className='mt-2 mb-3' style={{ color: txtColor }}>ORDER SUMMARY</h4>
                    <div className="d-flex">
                        <div className="container text-flex-start">
                            <p>Subtotal</p>
                            <p>Delivery Charge</p>
                            <h6 style={{ color: txtColor }}>TOTAL (Inc of all Taxes.)</h6>
                        </div>

                        <div className="container text-flex-end">
                            <p>$ {calPrice}</p>
                            <p>$ {deliveryFee}</p>
                            <h6 style={{ color: txtColor }}>$ {calPrice+deliveryFee}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-2 p-0 d-flex' >
            <a class="btn p-1 btn-lg flex-end" href="/payment" role="button"   style={{backgroundColor: txtColor, color: "#fff", width: '83.5%'}}>Pay Now</a>
            </div>
        </>
    
  )
}

export default OrderSummary
