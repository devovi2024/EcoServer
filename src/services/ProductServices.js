const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//  BRAND LIST 
const ProductBrandListService = async () => {
  try {
    const data = await BrandModel.find().lean();
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

//  CATEGORY LIST 
const ProductCategoryService = async () => {
  try {
    const data = await CategoryModel.find().lean();
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

//  SLIDER LIST 
const ProductSliderListService = async () => {
  try {
    const data = await SliderModel.find().lean();
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

//  PRODUCT LIST BY BRAND 
const ProductListByBrandService = async (req) => {
  try {
    const BrandID = new ObjectId(req.params.BrandID);
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
    return { status: "fail", data: error.message.toString() };
  }
};

//  PRODUCT LIST BY CATEGORY 
const ProductListByCategoryService = async (req) => {
  try {
    const CategoryID = new ObjectId(req.params.CategoryID);
    const data = await ProductModel.aggregate([
      { $match: { categoryID: CategoryID } },
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
    return { status: "fail", data: error.message.toString() };
  }
};

//  PRODUCT LIST BY REMARK 
const ProductListByRemarkService = async (req) => {
  try {
    const Remark = req.params.Remark;
    const data = await ProductModel.aggregate([
      { $match: { remark: Remark } },
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
    return { status: "fail", data: error.message.toString() };
  }
};

//  PRODUCT LIST BY SIMILAR 
const ProductListBySimilarService = async (req) => {
  try {
    const CategoryID = new ObjectId(req.params.CategoryID);
    const data = await ProductModel.aggregate([
      { $match: { categoryID: CategoryID } },
      { $limit: 10 },
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
    return { status: "fail", data: error.message.toString() };
  }
};

//  PRODUCT DETAILS 
const ProductDetailsService = async (req, res) => {
  try {
    const ProductID = new ObjectId(req.params.ProductID);

    const data = await ProductModel.aggregate([
      { $match: { _id: ProductID } },

      // Lookup brand
      {
        $lookup: {
          from: "brands",
          localField: "brandID",
          foreignField: "_id",
          as: "brands",
        },
      },
      {
        $unwind: {
          path: "$brands",
          preserveNullAndEmptyArrays: true, // prevent crash if no brand
        },
      },

      // Lookup category
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: {
          path: "$categories",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup product details
      {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "productID",
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    // Return single object instead of array
    if (data.length === 0) {
      return res.status(404).json({ status: "fail", data: "Product not found" });
    }

    return res.status(200).json({ status: "success", data: data[0] });
  } catch (error) {
    console.error("ProductDetailsService error:", error.message);
    return res.status(500).json({ status: "fail", data: error.message });
  }
};



//  PRODUCT LIST BY KEYWORD 
const ProductListByKeywordService = async (req) => {
  try {
    const SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    const data = await ProductModel.aggregate([
      { $match: { $or: [{ title: SearchRegex }, { shortDescription: SearchRegex }] } },
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
    return { status: "fail", data: error.message.toString() };
  }
};

//  CREATE REVIEW 
const ProductCreateReviewService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const { product_id, des, ratting } = req.body;
    const data = await ReviewModel.create({
      productID: product_id,
      userID: user_id,
      des,
      ratting,
    });
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

//  REVIEW LIST 
const ProductReviewListService = async (req) => {
  try {
    let ProductID = req.params.ProductID;

    // check DB type: ObjectId or string
    const review = await ReviewModel.find({ productID: ProductID }).lean();
    return { status: "success", data: review };
  } catch (error) {
    return { status: "fail", data: error.message.toString() };
  }
};

//  FILTER LIST 
const ListByFilterService = async (req) => {
  try {
    const matchConditions = {};
    if (req.body.categoryID) matchConditions.categoryID = new ObjectId(req.body.categoryID);
    if (req.body.brandID) matchConditions.brandID = new ObjectId(req.body.brandID);

    const priceMin = parseInt(req.body.priceMin);
    const priceMax = parseInt(req.body.priceMax);

    const priceMatch = {};
    if (!isNaN(priceMin)) priceMatch.$gte = priceMin;
    if (!isNaN(priceMax)) priceMatch.$lte = priceMax;

    const aggregatePipeline = [
      { $match: matchConditions },
      { $addFields: { numericPrice: { $toInt: "$price" } } },
    ];

    if (Object.keys(priceMatch).length) aggregatePipeline.push({ $match: { numericPrice: priceMatch } });

    aggregatePipeline.push(
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
      { $project: { "brand._id": 0, "category._id": 0, createdAt: 0, updatedAt: 0 } }
    );

    const data = await ProductModel.aggregate(aggregatePipeline);
    return { status: "success", data };
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
  ListByFilterService,
};
