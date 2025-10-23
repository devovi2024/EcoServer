const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductSliderList", ProductController.ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory);
router.get("/ProductListBySimilar/:CategoryID", ProductController.ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword);
router.get("/ProductListByRemark/:Keyword", ProductController.ProductListByRemark);
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.get("/ProductReviewList/:ProductID", ProductController.ProductReviewList);

router.post("/ProductCreateReview", ProductController.ProductCreateReview);

module.exports = router;
