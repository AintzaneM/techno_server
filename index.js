const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require('cors'); 
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute= require ("./routes/users");
const authRoute= require ("./routes/auth");
const postRoute= require ("./routes/posts");
const path = require ("path")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log("Connected to MongoDB")
});
// set up cors
module.exports = app => {
    // ...
   
    // ADD CORS SETTINGS HERE INSIDE module.exports TO ALLOW CROSS-ORIGIN INTERACTION:
    app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
      })
    );
   
    // ...
  };



//set up cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats:  ['jpg', 'png', 'jpeg', "mp4", "mp3"],
        folder: 'techno-gallery', // The name of the folder in cloudinary
        use_filename: true,
        // unique_filename: false,
      // resource_type: 'raw', // => this is in case you want to upload other type of files, not just images
      
    }
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("img"), (req, res) => {
    console.log('file is: ', req.file)
 
    // if (!req.file) {
    //   next(new Error('No file uploaded!'));
    //   return;
    // }
    // res.json({ secure_url: req.file.path });

    try {
        return res.status(200).json("File uploaded succesfully")

    }catch(error) {
        console.log(error, "error")
    }
});


// app.use("/api/upload", express.static(path.join(__dirname, "/techno-gallery")))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))


app.use("/api/auth", (authRoute))
app.use("/api/users", (userRoute))
app.use("/api/posts", (postRoute))


app.listen(5000, () => {
    console.log("Backend is ready to goooo!")
})