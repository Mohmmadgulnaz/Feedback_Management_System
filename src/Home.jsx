import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Popover,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Star, StarBorder } from "@mui/icons-material";

const feedbackCategories = [
  { label: "Product Features", value: "Product Features" },
  { label: "Product Pricing", value: "Product Pricing" },
  { label: "Product Usability", value: "Product Usability" },
];

const productCategories = [
  { label: "Groceries", value: "Groceries" },
  { label: "Baby Products", value: "Baby Products" },
  { label: "Electronics", value: "Electronics" },
  { label: "Home & Kitchen", value: "Home & Kitchen" },
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState({
    productName: "",
    productCategory: "",
    category: "",
    rating: 0,
    comment: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(jwtDecode(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleStarClick = (index) => {
    setFeedback({ ...feedback, rating: index + 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...feedback, googleId: user.sub, name: user.name, email: user.email }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      alert("Feedback submitted successfully!");
      setFeedback({ productName: "", productCategory: "", category: "", rating: 0, comment: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleViewFeedbacks = () => {
    handlePopoverClose();
    navigate("/user_feedbacks", { state: { user } });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, backgroundColor: "#f4f6f8", p: 3, borderRadius: 3 }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {user ? `Welcome, ${user.name}` : "Welcome"}
        </Typography>
        {user && (
          <IconButton onClick={handleAvatarClick}>
            <Avatar src={user.picture} alt={user.name} />
          </IconButton>
        )}
      </Box>

      
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handlePopoverClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Card sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6">{user?.name}</Typography>
          <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
          <Divider sx={{ my: 1 }} />
          <Button onClick={handleViewFeedbacks} variant="outlined" fullWidth>View Feedbacks</Button>
          <Button onClick={handleLogout} variant="contained" color="error" fullWidth sx={{ mt: 1 }}>Logout</Button>
        </Card>
      </Popover>

      
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={2} color="primary">Submit Your Feedback</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Product Name" name="productName" value={feedback.productName} onChange={handleChange} fullWidth margin="normal" required />
            <TextField select label="Product Category" name="productCategory" value={feedback.productCategory} onChange={handleChange} fullWidth margin="normal" required>
              {productCategories.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
            </TextField>
            <TextField select label="Feedback Category" name="category" value={feedback.category} onChange={handleChange} fullWidth margin="normal" required>
              {feedbackCategories.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
            </TextField>

           
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body1" mr={1}>Rating:</Typography>
              {[...Array(5)].map((_, index) => (
                <IconButton key={index} onClick={() => handleStarClick(index)}>
                  {index < feedback.rating ? <Star sx={{ color: "#FFD700" }} /> : <StarBorder />}
                </IconButton>
              ))}
            </Box>

            <TextField label="Your Feedback" name="comment" value={feedback.comment} onChange={handleChange} fullWidth margin="normal" required multiline rows={4} />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, p: 1.5, fontSize: "1rem", borderRadius: 2 }}>Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;





