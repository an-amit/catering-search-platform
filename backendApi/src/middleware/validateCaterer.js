function validateCaterer(req, res, next) {
  const errors = [];
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!location || typeof location !== "string" || !location.trim()) {
    errors.push("location is required and must be a non-empty string");
  }

  const parsedPrice = Number(pricePerPlate);
  if (
    pricePerPlate === undefined ||
    pricePerPlate === "" ||
    Number.isNaN(parsedPrice) ||
    parsedPrice <= 0
  ) {
    errors.push("pricePerPlate is required and must be a number greater than 0");
  } else {
    req.body.pricePerPlate = parsedPrice;
  }

  if (!Array.isArray(cuisines) || cuisines.length === 0) {
    errors.push("cuisines is required and must be a non-empty array");
  } else {
    const sanitizedCuisines = cuisines
      .filter((item) => item !== undefined && item !== null)
      .map((item) => String(item).trim())
      .filter(Boolean);

    if (sanitizedCuisines.length === 0) {
      errors.push("cuisines must contain at least one non-empty string");
    } else {
      req.body.cuisines = sanitizedCuisines;
    }
  }

  const parsedRating = Number(rating);
  if (
    rating === undefined ||
    rating === "" ||
    Number.isNaN(parsedRating) ||
    parsedRating < 0 ||
    parsedRating > 5
  ) {
    errors.push("rating is required and must be a number between 0 and 5");
  } else {
    req.body.rating = parsedRating;
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = validateCaterer;
