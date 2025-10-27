const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    productID: {type:mongoose.Schema.ObjectId, required:true},
    userID: {type:mongoose.Schema.ObjectId, required:true},
    des:{type:String, requitred:true},
    ratting:{type:String, requitred:true},
});

const ReviewModel = mongoose.model('reviews', DataSchema);
module.exports=ReviewModel;