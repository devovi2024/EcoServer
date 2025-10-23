const {
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
} = require("../services/ProductServices");

// Brand List
exports.ProductBrandList = async (req, res) => {
  let result = await ProductBrandListService(req, res);
  res.status(200).json(result);
};

// Category List
exports.ProductCategoryList = async (req, res) => {
  let result = await ProductCategoryService(req, res);
  res.status(200).json(result);
};

// Slider List
exports.ProductSliderList = async (req, res) => {
  let result = await ProductSliderListService(req, res);
  res.status(200).json(result);
};

// Product List by Brand
exports.ProductListByBrand = async (req, res) => {
  let result = await ProductListByBrandServcie(req, res);
  res.status(200).json(result);
};

// Product List by Category
exports.ProductListByCategory = async (req, res) => {
  let result = await ProductListByCategoryService(req, res);
  res.status(200).json(result);
};

// Product List by Remark
exports.ProductListByRemark = async (req, res) => {
  let result = await ProductListByRemarkService(req, res);
  res.status(200).json(result);
};

// Product List by Similar Category
exports.ProductListBySimilar = async (req, res) => {
  let result = await ProductListBySimilarService(req, res);
  res.status(200).json(result);
};

// Product Details
exports.ProductDetails = async (req, res) => {
  let result = await ProductDetailsService(req, res);
  res.status(200).json(result);
};

// Product List by Keyword
exports.ProductListByKeyword = async (req, res) => {
  let result = await ProductListByKeywordService(req, res);
  res.status(200).json(result);
};

// Product Review List
exports.ProductReviewList = async (req, res) => {
  try {
    let result = await ProductReviewListService(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};


exports.ProductCreateReview = async (req, res) => {
  res.status(200).json({ status: "pending", message: "Review create route coming soon" });
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
};
