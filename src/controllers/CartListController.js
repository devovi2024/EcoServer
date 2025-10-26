
const { CartListService, SaveCartListService, UpdateCartListService, RemoveCartListService } = require('../services/CartListServices');




exports.CartList = async(req, res) =>{
    let result = CartListService(req);
    return res.status(200).json(result)
}

exports.SaveCartList = async(req, res) =>{
    let result = SaveCartListService(req);
    return res.status(200).json(result)
}

exports.UpdateCartList = async(req, res) =>{
    let result = UpdateCartListService(req);
    return res.status(200).json(result)
}

exports.RemoveCartList = async(req, res) =>{
    let result = RemoveCartListService(req);
    return res.status(200).json(result)
}

