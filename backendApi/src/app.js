const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Catering search platform API is running !!" });
});

const caterersRouter = require("./routes/caterers");

app.use("/api/caterers", caterersRouter);

module.exports = app;
