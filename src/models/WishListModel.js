const mongoose = require('mongoose');
const { use } = require('react');
const DataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true  },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true  },
}, { timestamps: true , versionKey: false});

const WishListModel = mongoose.model('wishlists', DataSchema);
module.exports = WishListModel;