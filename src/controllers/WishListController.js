const { WishListService, CreateWishListService, RemoveWishListService } = require('../services/WishListServices');

exports.WishList = async (req, res) => {
    let result = await WishListService(req);
    return res.status(200).json(result);
};

exports.CreateWishList = async (req, res) => {
    let result = await CreateWishListService(req);
    return res.status(201).json(result);
};

exports.RemoveWishList = async (req, res) => {
    let result = await RemoveWishListService(req);
    return res.status(200).json(result);
};
