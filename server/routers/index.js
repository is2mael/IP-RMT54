const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hallo Guys")
})

module.exports = router