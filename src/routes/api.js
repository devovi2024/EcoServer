const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const InvoiceController = require("../controllers/InvoiceController");
const WishListController = require("../controllers/WishListController");
const FeaturesController = require("../controllers/FeaturesController");
const AuthVerify = require("../middleware/AuthVerify");

//  Product Routes 
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductSliderList", ProductController.ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory);
router.get("/ProductListBySimilar/:CategoryID", ProductController.ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword);
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark);
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.get("/ProductReviewList/:ProductID", ProductController.ProductReviewList);
router.post("/ProductCreateReview", AuthVerify, ProductController.ProductCreateReview);


router.post("/ProductListByFilter", ProductController.ProductListByFilter);


//  User Routes 

router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/UserVerifyLogin/:email/:otp", UserController.UserVerifyLogin);
router.get("/UserLogout", AuthVerify, UserController.UserLogout);
router.post("/UserCreate", AuthVerify, UserController.UserCreate); 
router.post("/UserUpdateProfile", AuthVerify, UserController.UserUpdateProfile);
router.get("/UserReadProfile", AuthVerify, UserController.UserReadProfile);


//  Wishlist Routes 
router.get("/WishList", AuthVerify, WishListController.WishList);
router.post("/CreateWishList", AuthVerify, WishListController.CreateWishList);
router.delete("/RemoveWishList", AuthVerify, WishListController.RemoveWishList);

//  Invoice Routes 
router.post("/CreateInvoice", AuthVerify, InvoiceController.CreateInvoice);
router.get("/InvoiceList", AuthVerify, InvoiceController.InvoiceList);
router.get("/InvoiceProductList/:invoice_id", AuthVerify, InvoiceController.InvoiceProductList);
router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess);
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail);
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel);
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN);

//  Features Routes 
router.get('/FeaturesList', FeaturesController.FeaturesList);

module.exports = router;
