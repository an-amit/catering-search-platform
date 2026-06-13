require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const ORIGIN = process.env.ORIGIN;
const corsOptions = {
  origin: ORIGIN,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Catering search platform API is running !!" });
});

const caterersRouter = require("./routes/caterers");

app.use("/api/caterers", caterersRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

module.exports = app;
