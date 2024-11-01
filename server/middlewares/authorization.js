const { Favorite, User } = require("../models")

async function authorization(req, res, next) {
    const { id } = req.params
    try {
        let fav = await Favorite.findByPk(id)
        if (!fav) {
            throw { name: "Not Found", message: "User not found" }
        }

        if (fav.userId !== req.user.id) {
            throw { name: "Forbidden", message: "You are not authorized" }
        }

        next()
    } catch (err) {
        console.log("🚀 ~ authorization ~ err:", err)
        next(err)
    }
}

module.exports = authorization