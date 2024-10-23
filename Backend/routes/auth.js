const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")
//fetchuser----

const JWT_SECRET = "Snehaisagoodgir$l";


//-----Route1: create a User Using: POST "/api/auth/createUser". -----
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("role", "Role must be selected").notEmpty(),
    // body("phone").optional({ checkFalsy: true }).isMobilePhone().withMessage("Enter a valid phone number"),
    body("address").optional({ checkFalsy: true }).isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
    body("experience").optional({ checkFalsy: true }).isInt({ min: 0 }).withMessage("Experience must be a valid number"),
    body("portfolio").optional({ checkFalsy: true }).isURL().withMessage("Portfolio must be a valid URL"),
    body("aadharCardLink").optional({ checkFalsy: true }).isURL().withMessage("Aadhar card link must be a valid URL"),
], async (req, res) => {
    let success = false;

    console.log("in backend")

    // Validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const currentRoleUser = req.body.role;

        // Create customer user
        if (currentRoleUser === "customer") {
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                role: req.body.role,
            });
        } 
        // Create seller user with additional fields
        else if (currentRoleUser === "seller") {
            // const { phone, address, experience, portfolio, aadharCardLink } = req.body;

            // if (!phone || !address || !experience || !portfolio || !aadharCardLink) {
            //     return res.status(400).jsosn({ success, error: "All seller fields must be filled" });
            // }

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                role: req.body.role,
                phone: req.body.phone,
                address: req.body.address,
                experience: req.body.experience,
                portfolio: req.body.portfolio,
                aadharCardLink: req.body.aadharCardLink,
            });

            console.log("user...", user);
        }

        // Generate JWT token
        const data = {
            user: { id: user.id }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;

        res.json({ success, username: user.name, authToken, currentRoleUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});



//-----Route2: login a existing user: POST "/api/auth/login". -----
router.post("/login", [
    //----REQUIREMENTS---
    body("email", "Enter valid email id").isEmail(),
    body("password", "passowrd mus be atleast 5 characters").isLength({min:5})
], async(req, res)=>{
    let success = false;

    //---if validations fails then return bad request and the errors---
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    //--if not errors in creating then check if user is existing
    //--extracting email and password
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: req.body.email});


        //----if user not exist----
        if(!user){
            return res.status(400).json({success, error: "Sorry User with this emailId not exist"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        
        if(!passwordCompare){
          return res.status(400).send("please try to login with correct credentials");
        }


        //---if everything is true----
        success = true;
        const payload = {
            user:{
                id:user.id
            }
        }
       
        const authToken = jwt.sign(payload, JWT_SECRET);
        const username = user.name;
        const role = user.role;
        console.log("currew....t user role is ", role);
        const currentUserRole = user.role;
        res.status(200).json({success, username, authToken, currentUserRole});



    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }

});


//----ROUTE 3: Get loggedin User Details: POST "/api/auth/getuser" ...Login required----
router.post("/getuser", fetchuser, async (req, res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        console.log(user);
        res.json({user});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured");
    }
    

})

module.exports = router;