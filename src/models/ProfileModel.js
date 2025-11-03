const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true  },
    customerName: { type: String},
    customerAddress: { type: String},
    customerCity: { type: String},
    customerCountry: { type: String},
    customerFax: { type: String},
    customerPhone: { type: String},
    customerState: { type: String},
    customerZipcode: { type: String},

    shipName: { type: String},
    shipAddress: { type: String},
    shipCity: { type: String},
    shipCountry: { type: String},
    shipPhone: { type: String},
    shipState: { type: String},
    shipZipcode: { type: String},
}, { timestamps: true , versionKey: false});

const ProfileModel = mongoose.model('profiles', DataSchema);
module.exports = ProfileModel;







