const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer");
const path = require("path");

const app = new express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("comman"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
})

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded");
  } catch (error) {
    console.log(error);
  }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, function () {
  console.log("Server started at port number 8800");
})