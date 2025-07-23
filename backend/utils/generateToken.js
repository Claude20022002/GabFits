const jwt = require("jsonwebtoken");

exports.generateToken = (userId, name) => {
    const token = jwt.sign({ id: userId, name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
    return token;
};
