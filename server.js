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