const jwt = require('jsonwebtoken');

exports.EncodeToken = () =>{
    let KEY = "201002487";
    let ExpiresIn = "24h";
    let Payload = {
        email:email,
        user_id:user_id,
    }
    return jwt.sign(Payload, KEY, {expiresIn:ExpiresIn});
}

exports.DecodeToken = () =>{
    try {
        let KEY = "201002487";
        return jwt.verify(token, KEY);
    } catch (error) {
        return null;
    }
}