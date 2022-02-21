const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("helloo auth rutes")
})
module.exports = router