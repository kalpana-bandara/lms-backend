const express = require("express");
const User = require("../models/users");

const router = express.Router();

//log users
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      // If no user is found, send an error response
      return res.status(200).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      // If password does not match, send an error response
      return res.status(200).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Server error" });
  }
});

module.exports = router;
