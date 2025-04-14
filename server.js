require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL, // Use the FRONTEND_URL from the .env file
];

// Enable CORS with the specific allowed origins using the cors middleware
app.use(
  cors({
    origin: allowedOrigins, // Only allow requests from the specified frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Methods that are allowed
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers for CORS requests
  })
);

// Explicitly setting CORS headers manually as a fallback
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Allow the frontend URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});