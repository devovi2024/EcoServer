const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Product Brand List
const ProductBrandListService = async (req, res) => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Category List
const ProductCategoryService = async (req, res) => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Slider List
// Product Slider List
const ProductSliderListService = async () => {
  try {
    // Find all sliders safely
    let data = await SliderModel.find().lean(); // lean() gives plain JS objects
    if (!data || data.length === 0) {
      return { status: "success", data: [], message: "No sliders found" };
    }
    return { status: "success", data };
  } catch (error) {
    console.error("Slider service error:", error.message);
    return { status: "fail", data: [], message: error.message.toString() };
  }
};


// Product List By Brand
const ProductListByBrandService = async (req, res) => {
  try {
    const BrandID = new mongoose.Types.ObjectId(req.params.BrandID);

    const data = await ProductModel.aggregate([
      { $match: { brandID: BrandID } },
      {
        $lookup: {
          from: "brands",
          localField: "brandID",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      {
        $project: {
          title: 1,
          price: 1,
          image: 1,
          remark: 1,
          "brand.BrandName": 1,
          "category.CategoryName": 1,
        },
      },
    ]);

    return { status: "success", data };
  } catch (error) {
    console.error("Error in ProductListByBrandService:", error.message);
    return { status: "fail", data: error.message.toString() };
  }
};


// Product List By Category
const ProductListByCategoryService = async (req, res) => {
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
const ProductListByRemarkService = async (req, res) => {
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
const ProductListBySimilarService = async (req, res) => {
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
const ProductDetailsService = async (req, res) => {
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
const ProductListByKeywordService = async (req, res) => {
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

// Review Create
const ProductCreateReviewService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;

    let data = await ReviewModel.create({
      productID: reqBody["product_id"],
      userID: user_id,
      des: reqBody["des"],
      ratting: reqBody["ratting"],
    });

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

// Product Review List
const ProductReviewListService = async (req, res) => {
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
        des: 1,
        ratting: 1,
        "profiles.cus_name": 1,
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


const ListByFilterService = async (req) => {
  try {
    let matchConditions = {};

    // Filter by category ID
    if (req.body["categoryID"]) {
      matchConditions.categoryID = new ObjectId(req.body["categoryID"]);
    }

    // Filter by brand ID
    if (req.body["brandID"]) {
      matchConditions.brandID = new ObjectId(req.body["brandID"]);
    }

    let MatchStage = { $match: matchConditions };

    // Convert price to number
    let AddFieldStage = {
      $addFields: { numericPrice: { $toInt: "$price" } },
    };

    let priceMin = parseInt(req.body["priceMin"]);
    let priceMax = parseInt(req.body["priceMax"]);

    let PriceMatchConditions = {};

    // Filter by minimum price
    if (!isNaN(priceMin)) {
      PriceMatchConditions["numericPrice"] = { $gte: priceMin };
    }

    // Filter by maximum price
    if (!isNaN(priceMax)) {
      PriceMatchConditions["numericPrice"] = {
        ...(PriceMatchConditions["numericPrice"] || {}),
        $lte: priceMax,
      };
    }

    let PriceMatchStage = { $match: PriceMatchConditions };

    // Join with brand collection
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brands",
      },
    };

    // Join with category collection
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

    // Select specific fields
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
      AddFieldStage,
      PriceMatchStage,
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



module.exports = {
  ProductBrandListService,
  ProductCategoryService,
  ProductSliderListService,
  ProductListByBrandService,
  ProductListByCategoryService,
  ProductListByRemarkService,
  ProductListBySimilarService,
  ProductDetailsService,
  ProductListByKeywordService,
  ProductCreateReviewService,
  ProductReviewListService,
  ListByFilterService
};
