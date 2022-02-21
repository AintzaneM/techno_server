const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("helloo user rutes")
})
module.exports = router