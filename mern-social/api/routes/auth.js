const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUSer = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    const user = await newUSer.save();
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
})

//Login
router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(validPassword){
        res.status(200).json(user);
      }
      else{
        res.status(404).json("Wrong password");
      }
    }
    else{
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router