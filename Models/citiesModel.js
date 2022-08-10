const mongoose = require("mongoose");

const citiesModel = mongoose.model("cities", {
  citId: { type: String },
  citName: { type: String },
  isActive: { type: Boolean },
});

module.exports = citiesModel;
