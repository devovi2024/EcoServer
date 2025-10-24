const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/SliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Product Brand List
exports.ProductBrandListService = async (req, res) => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Category List
exports.ProductCategoryService = async (req, res) => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Slider List
exports.ProductSliderListService = async (req, res) => {
  try {
    let data = await SliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product List By Brand
exports.ProductListByBrandServcie = async (req, res) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);
    let MatchStage = { $match: { brandID: BrandID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categories",
      },
    };
    let UnwindBrandStage = { $unwind: "$brands" };
    let UnwindCategoryStage = { $unwind: "$categories" };
    let ProjectionStage = {
      $project: {
        "brands._id": 0,
        "categories._id": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product List By Category
exports.ProductListByCategoryService = async (req, res) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categories",
      },
    };
    let UnwindBrandStage = { $unwind: "$brands" };
    let UnwindCategoryStage = { $unwind: "$categories" };
    let ProjectionStage = {
      $project: {
        "brands._id": 0,
        "categories._id": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product List By Remark
exports.ProductListByRemarkService = async (req, res) => {
  try {
    let Remark = req.params.Remark;
    let MatchStage = { $match: { remark: Remark } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categories",
      },
    };
    let UnwindBrandStage = { $unwind: "$brands" };
    let UnwindCategoryStage = { $unwind: "$categories" };
    let ProjectionStage = {
      $project: {
        "brands._id": 0,
        "categories._id": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product List By Similar
exports.ProductListBySimilarService = async (req, res) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let LimitStage = { $limit: 10 };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categories",
      },
    };
    let UnwindBrandStage = { $unwind: "$brands" };
    let UnwindCategoryStage = { $unwind: "$categories" };
    let ProjectionStage = {
      $project: {
        "brands._id": 0,
        "categories._id": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
      LimitStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Details
exports.ProductDetailsService = async (req, res) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: { _id: ProductID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categories",
      },
    };
    let ProductDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "productDetails",
      },
    };
    let UnwindBrandStage = { $unwind: "$brands" };
    let UnwindCategoryStage = { $unwind: "$categories" };
    let UnwindProductDetailsStage = { $unwind: "$productDetails" };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      ProductDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindProductDetailsStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product List By Keyword
exports.ProductListByKeywordService = async (req, res) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    let SearchParams = [{ title: SearchRegex }, { shortDescription: SearchRegex }];
    let SearchQuery = { $or: SearchParams };

    let MatchStage = { $match: SearchQuery };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categories",
      },
    };
    let UnwindBrandStage = { $unwind: "$brands" };
    let UnwindCategoryStage = { $unwind: "$categories" };
    let ProjectionStage = {
      $project: {
        "brands._id": 0,
        "categories._id": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Review List
exports.ProductReviewListService = async (req, res) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: { productID: ProductID } };
    let JoinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "_id",
        as: "profiles",
      },
    };
    let UnwindProfileStage = { $unwind: "$profiles" };
    let ProjectionStage = {
      $project: {
        "profiles._id": 0,
        "des": 1,
        "rating": 1,
        "profile_cus_name": 1,

        "profiles.createdAt": 0,
        "profiles.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfileStage,
      UnwindProfileStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

module.exports = {
  ProductBrandListService,
  ProductCategoryService,
  ProductSliderListService,
  ProductListByBrandServcie,
  ProductListByCategoryService,
  ProductListBySimilarService,
  ProductListByKeywordService,
  ProductListByRemarkService,
  ProductDetailsService,
  ProductReviewListService,
};


