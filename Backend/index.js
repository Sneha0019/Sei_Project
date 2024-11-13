require("../Backend/db")
const express = require("express");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, auth-token"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"); 
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(express.json());
app.use("/api/auth/", require("./routes/auth"))
app.use("/api/products", require("./routes/products"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/wishlists", require("./routes/wishlists"))
app.use("/api/reports", require("./routes/reports"))

//routings

app.post("/pay", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: "rzp_test_RCqZF0EIXUQt7G",
        key_secret: "oZbbnv5A0YNHmLuEvSbKtiqL",
      });
  
      if (!req.body) {
        return res.status(400).json({
          error: "No data provided",
        });
      }
      const options = req.body;
      const payment = await razorpay.orders.create(options);
      if (!payment) {
        return res.status(500).json({
          error: "An error occurred",
        });
      }
      return res.json(payment);
    } catch (e) {
      console.error("Error : ", e);
      res.status(500).send(e);
    }
  });

app.get("/" ,(req, res)=>{
    res.send("hello this is jewlw");
})


app.get("/login", (req, res)=>{
    try{
    res.send("this is login");
    }catch(error){
        res.status(500).send("internal server error")
    }
})

app.get("/signup", (req, res)=>{
    res.send("this is signup");
})

app.listen(PORT, ()=>{
    console.log(`Jewel Backend is listening ${PORT}`);
})

