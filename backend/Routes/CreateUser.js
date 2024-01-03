const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcryptjs");
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      console.log(req.body);
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Invalid Crediantials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Invalid Crediantials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, SecretKey);
      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  }
);

module.exports = router;
