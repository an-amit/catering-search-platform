const mongoose = require("mongoose");

const catererSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    pricePerPlate: {
      type: Number,
      required: [true, "pricePerPlate is required"],
      min: [1, "pricePerPlate must be a positive number"],
    },
    cuisines: {
      type: [String],
      required: [true, "cuisines is required"],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "cuisines must be a non-empty array of strings",
      },
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
      min: [0, "rating must be between 0 and 5"],
      max: [5, "rating must be between 0 and 5"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Caterer = mongoose.model("Caterer", catererSchema);

module.exports = Caterer;
