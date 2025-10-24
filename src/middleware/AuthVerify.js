const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (req, res, next) => {
    let token = req.headers['token'] || req.cookies['token'];

    if (!token) return res.status(401).json({ status: "fail", message: "Unauthorized" });

    let decodedToken = DecodeToken(token);

    if (!decodedToken) return res.status(401).json({ status: "fail", message: "Unauthorized" });

    req.headers.email = decodedToken.email;
    req.headers.user_id = decodedToken.user_id;

    next();
};
