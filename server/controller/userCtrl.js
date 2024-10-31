require("dotenv").config();
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");
const upload = require("../helpers/cloudynary");

exports.register = async (req, res, next) => {
  const { username, email, password, imgUrl } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      imgUrl,
    });
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.log("🚀 ~ exports.register=async ~ error:", err);
    next(err);
  }
};

exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      throw { name: "BadRequest", message: "Email is required" };
    }
    if (!password) {
      throw { name: "BadRequest", message: "Password is required" };
    }

    const newUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!newUser || !comparePassword(password, newUser.password)) {
      throw { name: "Unauthorized", message: "Invalid email/password" };
    }

    let access_token = generateToken(newUser);
    res.status(200).json({ access_token });
  } catch (err) {
    console.log("🚀 ~ exports.Login=async ~ err:", err);
    next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll()

    res.status(200).json({ user})
  } catch (err) {
    console.log("🚀 ~ exports.getAllUser= ~ err:", err)
    next(err)
  }
}

exports.userById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "username", "imgUrl"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log("🚀 ~ exports.UserById= ~ err:", err);
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let user = await User.findByPk(userId);
    if (!user) {
      throw { name: "Not Found", message: "User not found" };
    }

    if (req.file) {
    const uploadResult = await upload(req.file, "User", user, "Random");
    user.imgUrl = uploadResult.secure_url;
    }
    // Save the updated user data
    await user.save();
    res
      .status(200)
      .json({ message: `Profile image updated successfully`, user });
  } catch (err) {
    console.log("🚀 ~ exports.UpdateUser= ~ err:", err);
    next(err);
  }
};
