const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true},
    payable:{type:String, required:true},
    customerAddress:{type:String, required:true},
    shipAddress:{type:String, required:true},
    transactionID:{type:String, required:true},
    val_ID:{type:String, required:true},
    dekiveryStatus:{type:String},
    paymentStatus:{type:String},
    total: {type:String, required:true},
    vat: {type:String, required:true},

}, { timestamps: true , versionKey: false });

const InvoiceModel = mongoose.model('invoice', DataSchema);
module.exports = InvoiceModel;