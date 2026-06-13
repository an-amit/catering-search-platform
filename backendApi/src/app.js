const express = require("express");
const cors = require("cors");

const ORIGIN = process.env.ORIGIN || "http://localhost:3000";
const corsOptions = {
  origin: ORIGIN,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Catering search platform API is running !!" });
});

const caterersRouter = require("./routes/caterers");

app.use("/api/caterers", caterersRouter);

module.exports = app;
