const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
    },
    address:{
        type:String
    },
    experience:{
        type:Number
    },
    portfolio:{
        type:String
    },
    aadharCardLink:{
        type:String
    },
    validSeller:{
        type:String,
        default:false
    },
    date:{
        type: Date,
        default:Date.now
    }
});


const User = new mongoose.model('User', UserSchema);
module.exports = User; 