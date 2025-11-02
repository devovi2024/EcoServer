const jwt = require('jsonwebtoken');

exports.EncodeToken = (email, user_id) => {
    const KEY = "201002487";
    const ExpiresIn = "24h";
    const Payload = { email, user_id };
    return jwt.sign(Payload, KEY, { expiresIn: ExpiresIn });
}

exports.DecodeToken = (token) => {
    try {
        const KEY = "201002487";
        return jwt.verify(token, KEY);
    } catch (error) {
        return null;
    }
}
