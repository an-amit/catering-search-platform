const Caterer = require("../models/Caterer");

// GET /api/caterers
// Supports optional query parameters: search, minPrice, maxPrice, location
async function getAllCaterers(req, res) {
  try {
    const { search, minPrice, maxPrice, location } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const priceFilter = {};

    if (minPrice !== undefined && minPrice !== "") {
      priceFilter.$gte = parseFloat(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== "") {
      priceFilter.$lte = parseFloat(maxPrice);
    }

    if (Object.keys(priceFilter).length > 0) {
      filter.pricePerPlate = priceFilter;
    }

    console.log("getAllCaterers filter:", filter);

    const rawCaterers = await Caterer.find(filter).lean();

    const caterers = rawCaterers.map((c) => ({
      ...c,
      id: c._id.toString(),
    }));

    return res.json({ success: true, count: caterers.length, data: caterers });
  } catch (error) {
    console.error("getAllCaterers error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    });
  }
}

// GET /api/caterers/:id
async function getCatererById(req, res) {
  try {
    const { id } = req.params;

    const caterer = await Caterer.findById(id).lean();
    if (!caterer) {
      return res
        .status(404)
        .json({ success: false, message: "Caterer not found" });
    }

    caterer.id = caterer._id.toString();
    delete caterer._id;
    delete caterer.__v;

    return res.json({ success: true, data: caterer });
  } catch (error) {
    console.error("getCatererById error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    });
  }
}

// POST /api/caterers
async function createCaterer(req, res) {
  try {
    const { name, location, pricePerPlate, cuisines, rating } = req.body;

    const newCaterer = await Caterer.create({
      name,
      location,
      pricePerPlate,
      cuisines: Array.isArray(cuisines)
        ? cuisines.map((c) => String(c).trim())
        : [],
      rating,
    });

    return res.status(201).json({ success: true, data: newCaterer });
  } catch (error) {
    console.error("createCaterer error:", error);
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unable to create caterer",
    });
  }
}

module.exports = {
  getAllCaterers,
  getCatererById,
  createCaterer,
};
