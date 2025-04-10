const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    enum: ["Groceries", "Baby Products", "Electronics", "Home & Kitchen"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Product Features", "Product Pricing", "Product Usability"],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  feedbacks: [FeedbackSchema], // Store all feedbacks directly inside the user document
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
