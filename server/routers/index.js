const { register, Login, UserById } = require("../controller/userCtrl")
const errorHandler = require("../middlewares/errorhandler")

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hallo Guys")
})

router.post("/register", register)
router.post("/login", Login)

router.get("/user/:id", UserById)

router.use(errorHandler)

module.exports = router