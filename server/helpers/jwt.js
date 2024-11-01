const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

exports.generateToken = ({ id, email }) => {
    return jwt.sign({ id, email }, secret)
}

exports.verifyToken = (token) => {
    return jwt.verify(token, secret)
}