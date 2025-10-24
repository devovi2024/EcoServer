const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const AuthVerify = require("../middleware/AuthVerify");
const { WishList, CreateWishList, RemoveWishList } = require("../controllers/WishListController");

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

router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/UserVerifyLogin/:email/:otp", UserController.UserVerifyLogin);
router.get("/UserLogout", AuthVerify, UserController.UserLogout);
router.post("/UserRegister", AuthVerify, UserController.UserRegister);
router.post("/UserUpdateProfile", AuthVerify, UserController.UserUpdateProfile);
router.get("/UserReadProfile", AuthVerify, UserController.UserReadProfile);



router.get("/", WishList);
router.post("/", CreateWishList);
router.delete("/", RemoveWishList);




module.exports = router;
