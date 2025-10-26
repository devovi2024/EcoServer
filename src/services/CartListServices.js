const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const CartModel = require("../models/CartModel");

const CartListServices = async (req) => {
  try {
    let user_id = ObjectID(req.headers.user_id);
    let matchStage = { $match: { userID: user_id } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "productDetails",
      },
    };
    let unwindStageProduct = { $unwind: "$productDetails" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "productDetails.brandID",
        foreignField: "_id",
        as: "brandDetails",
      },
    };
    let unwindStageBrand = { $unwind: "$brandDetails" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "productDetails.categoryID",
        foreignField: "_id",
        as: "categoryDetails",
      },
    };
    let unwindStageCategory = { $unwind: "$categoryDetails" };

    let projectStage = {
      $project: {
        _id: 0,
        userID: 0,
        "productDetails._id": 0,
        "productDetails.categoryID": 0,
        "productDetails.brandID": 0,
        "brandDetails._id": 0,
        "categoryDetails._id": 0,
      },
    };

    let data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindStageProduct,
      JoinStageBrand,
      unwindStageBrand,
      JoinStageCategory,
      unwindStageCategory,
      projectStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

const SaveCartListService = async (req) => {
  try {
    let user_id = req.body.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.create(reqBody);
    return { status: "success", message: "Cart list saved successfully" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

const UpdateCartListService = async (req) => {
  try {
    let user_id = req.body.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;
    reqBody.userID = user_id;

    let result = await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: reqBody }
    );

    return { status: "success", message: "Cart list updated successfully", data: result };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

const RemoveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart list removed successfully" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

module.exports = {
  CartListServices,
  SaveCartListService,
  UpdateCartListService,
  RemoveCartListService,
};
