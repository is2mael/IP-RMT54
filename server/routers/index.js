const { postFavorite, deleteFav, listFav } = require("../controller/favoriteCtrl")
const { register, Login, UserById, updateUser } = require("../controller/userCtrl")
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

router.patch("/user/:id/imgUrl", upload.single("file"), updateUser)
router.post("/favorite", postFavorite)
router.delete("/favorite", deleteFav)
router.get("/favotite", listFav)

router.use(errorHandler)

module.exports = router