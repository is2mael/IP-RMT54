const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization
        console.log(access_token, "<<<< di authentication");
        
        if (!access_token) {
            throw { name: "JasonWebTokenError", message: "Invalid Token" }
        }

        const [bearer, token] = access_token.split(" ")
        if (bearer !== "Bearer") {
            throw { name: "Unauthorized", message: "invalid Token" }
        }

        const payload = verifyToken(token)
        console.log(payload, "<<<<< payload di authentication");
        
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: "Unauthorized", message: "Invalid Token" }
        }

        req.user = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        next()
    } catch (err) {
        console.log("🚀 ~ authentication ~ err:", err)
        next(err)
    }
}

module.exports = authentication