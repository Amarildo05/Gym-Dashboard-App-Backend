require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Frontend URL from .env
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

console.log("Allowed origin:", process.env.FRONTEND_URL); // debug log

app.use(cors(corsOptions)); // Use CORS with the options
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