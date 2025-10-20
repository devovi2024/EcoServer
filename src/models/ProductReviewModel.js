const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, required: true},
    userID: { type: mongoose.Schema.Types.ObjectId, required: true},
    reviewText: { type: String, required: true },
    rating: { type: String, required: true },
}, { timestamps: true , versionKey: false });

const ProductReviewModel = mongoose.model('productReview', DataSchema);
module.exports = ProductReviewModel;