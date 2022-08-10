const mongoose = require("mongoose");

const providersModel = mongoose.model("providers", {
  proId: { type: String },
  proName: { type: String },
  isActive: { type: Boolean },
});

module.exports = providersModel;
