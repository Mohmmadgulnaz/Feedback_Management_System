import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import FeedbackList from "./FeedbackList.jsx";
import { Box, Typography } from "@mui/material";

const CLIENT_ID = "23979738750-g4gb43akoe8f27h7smi0bbdumgcvlc0n.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  Welcome to Feedback Management System
                </Typography>
                <Login />
              </Box>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/user_feedbacks" element={<FeedbackList />} />
        </Routes>
      </Box>
    </GoogleOAuthProvider>
  );
}

export default App;
