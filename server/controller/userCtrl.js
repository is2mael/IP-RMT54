const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { User } = require("../models")

exports.register = async(req, res, next) => {
    const { username, email, password, imgUrl } = req.body
    try {
        const newUser = await User.create({
            username,
            email,
            password, 
            imgUrl
        })
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        })
    } catch (err) {
        console.log("🚀 ~ exports.register=async ~ error:", error)
        next(err)       
    }
}

exports.Login = async(req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email) {
            throw { name: "BadRequest", message: "Email is required" }
        }
        if (!password) {
            throw { name: "BadRequest", message: "Password is required" }
        }

        const newUser = await User.findOne({
            where: {
                email
            }
        })

        if (!newUser || !comparePassword(password, newUser.password)) {
            throw { name: "Unauthorized", message: "Invalid email/password" }
        }

        let access_token = generateToken(newUser)
        res.status(200).json({ access_token })
    } catch (err) {
        console.log("🚀 ~ exports.Login=async ~ err:", err)
        next(err)
    }
}

exports.UserById = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: ["id", "name", "imgUrl"]
        })
        res.status(200).json(user)
    } catch (err) {
        console.log("🚀 ~ exports.UserById= ~ err:", err)
        next(err)
    }
}

exports.UpdateUser = async (req, res, next) => {
    const { username, imgUrl } = req.body
    try {
        await User.update({
            username,
            imgUrl
        },
        {
            where: {
                id: req.user.id
            }
        })
        res.status(200).json({ message: "Update success" })
    } catch (err) {
        console.log("🚀 ~ exports.UpdateUser= ~ err:", err)
        next(err)
    }
}