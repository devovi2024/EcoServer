const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    brandName: { type: String, required: true, unique: true },
    brandImage: { type: String, required: true },
}, { timestamps: true, versionKey: false });

const BrandModel = mongoose.model("Brand", DataSchema);

module.exports = BrandModel;
