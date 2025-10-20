const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, required: true},
    userID: { type: mongoose.Schema.Types.ObjectId, required: true},
    invoiceID: { type: mongoose.Schema.Types.ObjectId, required: true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String },
    size: { type: String },

}, { timestamps: true , versionKey: false });

const InvoiceProductModel = mongoose.model('InvoiceProduct', DataSchema);
module.exports = InvoiceProductModel;