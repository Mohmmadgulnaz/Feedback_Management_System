const User = require("../models/User");

exports.feedback_post = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { googleId, name, email, productName, productCategory, category, rating, comment } = req.body;

    
    if (!googleId || !name || !email || !productName || !productCategory || !category || !rating || !comment) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ error: "All fields are required." });
    }

  
    let user = await User.findOne({ googleId });

    const newFeedback = { productName, productCategory, category, rating, comment, createdAt: new Date() };

    if (user) {
      
      user.feedbacks.push(newFeedback);
    } else {
      
      user = new User({ googleId, name, email, feedbacks: [newFeedback] });
    }

    await user.save();

    console.log("Feedback saved to user:", newFeedback);

    res.status(201).json({ message: "Feedback submitted successfully!", feedback: newFeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





exports.userfeedback_get = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findOne({ googleId: id });

    if (!user || !user.feedbacks.length) {
      return res.status(404).json({ message: "No feedbacks found for this user" });
    }

    res.json({ feedbacks: user.feedbacks });
  } catch (error) {
    console.error("Error fetching user feedbacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.userfeedback_update = async (req, res) => {
  try {
    const { id, index } = req.params;
    const { category, rating, comment } = req.body;

    const user = await User.findOne({ googleId: id });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (index < 0 || index >= user.feedbacks.length) {
      return res.status(400).json({ error: "Invalid feedback index" });
    }

   
    user.feedbacks[index] = { ...user.feedbacks[index], category, rating, comment };
    await user.save();

    res.json({ message: "Feedback updated successfully", feedback: user.feedbacks[index] });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.userfeedback_delete = async (req, res) => {
  try {
    const { id, index } = req.params;

    const user = await User.findOne({ googleId: id });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (index < 0 || index >= user.feedbacks.length) {
      return res.status(400).json({ error: "Invalid feedback index" });
    }

    user.feedbacks.splice(index, 1);
    await user.save();

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

