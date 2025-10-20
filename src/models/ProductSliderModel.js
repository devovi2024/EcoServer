const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    img1: { type: String, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: String, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true  },
}, { timestamps: true , versionKey: false});

const ProductSliderModel = mongoose.model('productsliders', DataSchema);
module.exports = ProductSliderModel;