const mongoose = require("mongoose");

const servicesModel = mongoose.model("services", {
  serId: { type: String },
  serName: { type: String },
  isActive: { type: Boolean },
});

module.exports = servicesModel;
