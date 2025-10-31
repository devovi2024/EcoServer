const {
  ProductBrandListService,
  ProductCategoryService,
  ProductSliderListService,
  ProductListByBrandService,
  ProductListByCategoryService,
  ProductListBySimilarService,
  ProductListByKeywordService,
  ProductListByRemarkService,
  ProductDetailsService,
  ProductReviewListService,
  ProductCreateReviewService,
  ListByFilterService, 
} = require("../services/ProductServices");

// Brand List
const ProductBrandList = async (req, res) => {
  let result = await ProductBrandListService(req, res);
  res.status(200).json(result);
};

// Category List
const ProductCategoryList = async (req, res) => {
  let result = await ProductCategoryService(req, res);
  res.status(200).json(result);
};

// Slider List
const ProductSliderList = async (req, res) => {
  let result = await ProductSliderListService(req, res);
  res.status(200).json(result);
};

// Product List by Brand
const ProductListByBrand = async (req, res) => {
  let result = await ProductListByBrandService(req, res);
  res.status(200).json(result);
};

// Product List by Category
const ProductListByCategory = async (req, res) => {
  let result = await ProductListByCategoryService(req, res);
  res.status(200).json(result);
};

// Product List by Remark
const ProductListByRemark = async (req, res) => {
  let result = await ProductListByRemarkService(req, res);
  res.status(200).json(result);
};

// Product List by Similar Category
const ProductListBySimilar = async (req, res) => {
  let result = await ProductListBySimilarService(req, res);
  res.status(200).json(result);
};

// Product Details
const ProductDetails = async (req, res) => {
  let result = await ProductDetailsService(req, res);
  res.status(200).json(result);
};

// Product List by Keyword
const ProductListByKeyword = async (req, res) => {
  let result = await ProductListByKeywordService(req, res);
  res.status(200).json(result);
};

// Product Review List
const ProductReviewList = async (req, res) => {
  try {
    let result = await ProductReviewListService(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Create Product Review
const ProductCreateReview = async (req, res) => {
  try {
    let result = await ProductCreateReviewService(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Product List by Filter (Category, Brand, Price)
const ProductListByFilter = async (req, res) => {
  try {
    let result = await ListByFilterService(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = {
  ProductBrandList,
  ProductCategoryList,
  ProductSliderList,
  ProductListByBrand,
  ProductListByCategory,
  ProductListBySimilar,
  ProductListByKeyword,
  ProductListByRemark,
  ProductDetails,
  ProductReviewList,
  ProductCreateReview,
  ProductListByFilter, 
};
