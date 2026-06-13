const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/caterers.json");

function readCaterersData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeCaterersData(caterers) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(caterers, null, 2));
}

// GET /api/caterers
// Supports optional query parameters: search, minPrice, maxPrice, location
function getAllCaterers(req, res) {
  let caterers = readCaterersData();
  const { search, minPrice, maxPrice, location } = req.query;

  if (search) {
    const term = search.toLowerCase();
    caterers = caterers.filter((c) => c.name.toLowerCase().includes(term));
  }

  if (minPrice) {
    caterers = caterers.filter((c) => c.pricePerPlate >= parseFloat(minPrice));
  }

  if (maxPrice) {
    caterers = caterers.filter((c) => c.pricePerPlate <= parseFloat(maxPrice));
  }

  if (location) {
    const loc = location.toLowerCase();
    caterers = caterers.filter((c) => c.location.toLowerCase().includes(loc));
  }

  res.json({ success: true, count: caterers.length, data: caterers });
}

// GET /api/caterers/:id
function getCatererById(req, res) {
  let catererId = req.params.id;

  let caterers = readCaterersData();
  let caterer = caterers.find((c) => c.id === catererId);

  if (!caterer) {
    return res
      .status(404)
      .json({ success: false, message: "Caterer not found" });
  }

  res.json({ success: true, data: caterer });
}

// POST /api/caterers
function createCaterer(req, res) {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  let caterers = readCaterersData();
  let newCaterer = {
    id: Date.now().toString(),
    name,
    location,
    pricePerPlate,
    cuisines: cuisines.map((c) => c.trim()),
    rating,
  };

  caterers.push(newCaterer);
  writeCaterersData(caterers);
  res.json({ success: true, data: newCaterer });
}

module.exports = {
  getAllCaterers,
  getCatererById,
  createCaterer,
};
