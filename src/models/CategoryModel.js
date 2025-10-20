const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    categoryImage: { type: String, required: true },
}, { timestamps: true, versionKey: false });

const CategoryModel = mongoose.model("category", DataSchema);

module.exports = CategoryModel;
