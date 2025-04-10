



import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState({});
  const location = useLocation();

  let user;
  try {
    user = location.state?.user || jwtDecode(localStorage.getItem("user"));
  } catch (error) {
    console.error("Invalid token:", error);
    user = null;
  }

  useEffect(() => {
    if (!user?.sub) return;

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/user/${user.sub}`);
        if (!response.ok) throw new Error("Failed to fetch feedbacks");

        const data = await response.json();
        setFeedbacks(data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/user/${user.sub}/feedback/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete feedback");

      setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleEdit = (feedback) => {
    setEditingId(feedback._id);
    setEditedFeedback({
      rating: feedback.rating,
      comment: feedback.comment,
    });
  };

  const handleEditChange = (e) => {
    setEditedFeedback({ ...editedFeedback, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/user/${user.sub}/feedback/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedFeedback),
      });

      if (!response.ok) throw new Error("Failed to update feedback");

      setFeedbacks(
        feedbacks.map((fb) => (fb._id === editingId ? { ...fb, ...editedFeedback } : fb))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        Your Feedbacks
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "gray" }}>No feedbacks available.</Typography>
      ) : (
        <Grid container direction="column" spacing={2}>
          {feedbacks.map((fb) => (
            <Grid item xs={12} key={fb._id}>
              <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2, p: 2, width: "80%", mx: "auto" }}>
                <CardContent>
                  <Typography variant="subtitle1" color="primary" fontWeight="bold">
                    Product Name: {fb.productName}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Product Category: {fb.productCategory}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Feedback Category: {fb.category}
                  </Typography>
                  <Typography variant="body2">{fb.rating}/5 - {fb.comment}</Typography>

                  {editingId === fb._id && (
                    <Box mt={2}>
                      <TextField
                        fullWidth
                        label="Rating"
                        name="rating"
                        type="number"
                        value={editedFeedback.rating}
                        onChange={handleEditChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Comment"
                        name="comment"
                        multiline
                        rows={2}
                        value={editedFeedback.comment}
                        onChange={handleEditChange}
                      />
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  {editingId === fb._id ? (
                    <Button variant="contained" sx={{ backgroundColor: "#1565C0", color: "white" }} onClick={handleSaveEdit}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="contained" sx={{ backgroundColor: "#1976D2", color: "white" }} onClick={() => handleEdit(fb)}>
                      Edit
                    </Button>
                  )}
                  <Button variant="contained" sx={{ backgroundColor: "#D32F2F", color: "white" }} onClick={() => handleDelete(fb._id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FeedbackList;

