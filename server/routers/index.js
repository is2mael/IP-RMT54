const { postFavorite, deleteFav, listFav } = require("../controller/favoriteCtrl")
const { register, Login, UserById, updateUser, userById, getAllUser } = require("../controller/userCtrl")
const authentication = require("../middlewares/autentication")
const authorization = require("../middlewares/authorization")
const errorHandler = require("../middlewares/errorhandler")
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hallo Guys")
})

router.post("/register", register)
router.post("/login", Login)

router.use(authentication)

router.get("/user/", getAllUser)
router.get("/user/:id", userById)
router.patch("/user/:id/imgUrl", upload.single("file"), updateUser)
router.post("/favorites/:id", postFavorite)
router.delete("/favorites/:id", deleteFav)
router.get("/favorites", listFav)

router.use(errorHandler)

module.exports = router