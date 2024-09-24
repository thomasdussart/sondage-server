const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  premier: { type: Number, default: 0 },
  deuxieme: { type: Number, default: 0 },
  troisieme: { type: Number, default: 0 },
  quatrieme: { type: Number, default: 0 },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
