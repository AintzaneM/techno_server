const router = require("express").Router();
const Post = require("../models/Post")


//create a posts

router.post("/", async (req, res) => {
    // const newPost = 
})
//update a posts
//delete a posts
//like a posts
//get a posts
//get timeline posts


router.get("/", (req, res) => {
    console.log("post page")
})

module.exports = router