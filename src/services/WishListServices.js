const WishModel = require('../models/WishListModel');
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;

const WishListService = async (req) => {
    try {
        let user_id = ObjectID(req.headers.user_id);

        let MatchStage = { $match: { userID: user_id } };

        let JoinStage = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "productDetails"
            }
        };

        let UnwindProductStage = { $unwind: "$productDetails" };

        let JoinBrandStage = {
            $lookup: {
                from: "brands",
                localField: "productDetails.brandID",
                foreignField: "_id",
                as: "brandDetails"
            }
        };
        let UnwindBrandStage = { $unwind: "$brandDetails" };

        let JoinCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "productDetails.categoryID",
                foreignField: "_id",
                as: "categoryDetails"
            }
        };
        let UnwindCategoryStage = { $unwind: "$categoryDetails" };

        let ProjectionStage = {
            $project: {
                _id: 1,
                userID: 1,
                productID: 1,
                productDetails: 1,
                brandDetails: 1,
                categoryDetails: 1
            }
        };

        let data = await WishModel.aggregate([
            MatchStage,
            JoinStage,
            UnwindProductStage,
            JoinBrandStage,
            UnwindBrandStage,
            JoinCategoryStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: "success", data };
    } catch (error) {
        return { status: "failed", message: error.message };
    }
};

const CreateWishListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let { productID } = req.body;

        await WishModel.updateOne(
            { userID: user_id, productID: productID },
            { $set: { userID: user_id, productID: productID } },
            { upsert: true }
        );

        return { status: "success", message: "Added to wish list" };
    } catch (error) {
        return { status: "failed", message: error.message };
    }
};

const RemoveWishListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let { productID } = req.body;

        await WishModel.deleteOne({ userID: user_id, productID: productID });

        return { status: "success", message: "Removed from wish list" };
    } catch (error) {
        return { status: "failed", message: error.message };
    }
};

module.exports = { WishListService, CreateWishListService, RemoveWishListService };
