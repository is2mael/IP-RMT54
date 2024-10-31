const { register, Login, UserById, updateUser } = require("../controller/userCtrl")
const authentication = require("../middlewares/autentication")
const authorization = require("../middlewares/authorization")
const errorHandler = require("../middlewares/errorhandler")

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hallo Guys")
})

router.post("/register", register)
router.post("/login", Login)

router.use(authentication)

router.patch("/user/:id/image", updateUser)
router.use(errorHandler)

module.exports = router