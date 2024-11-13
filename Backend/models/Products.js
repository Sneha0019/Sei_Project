const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
  },
  dimension: {
    type: String,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the seller (User) model
    required: true,
    ref: 'User', // Assuming you have a 'User' model where sellers are stored
  }
});

const Products = new mongoose.model('Products', ProductSchema);
module.exports = Products;
