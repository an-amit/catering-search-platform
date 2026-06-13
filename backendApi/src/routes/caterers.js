const express = require("express");
const router = express.Router();

const validateCaterer = require("../middleware/validateCaterer");
const {
  getAllCaterers,
  getCatererById,
  createCaterer,
} = require("../controllers/caterersController");

router.get("/", getAllCaterers);
router.get("/:id", getCatererById);
router.post("/", validateCaterer, createCaterer);
module.exports = router;
