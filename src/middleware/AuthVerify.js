module.exports = (req, res, next) => {
    let token = req.headers['token']
    if(token){
        token = req.cookies['token']
    }

    let decodedToken = DecodeToken(token)

    if(decodedToken === null){
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        let email = decodedToken['email']
        let user_id = decodedToken['user_id']
        req.headers.email = email
        req.headers.user_id = user_id
        next()
    }
}