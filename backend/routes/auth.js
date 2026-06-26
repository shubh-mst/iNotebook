const express = require("express");
//this below line uses router object and helps manage api routes and sending responses
const nodemailer = require("nodemailer");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
// const jwt_secret = "shubhisagoodbo$y";
const jwt_secret = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

//Route 1. create a user using : POST "/api/auth/createuser" . No Login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter atleast 5 digit password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    let success = false;

    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // check weather the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //     await transporter.sendMail({
      //       from: process.env.EMAIL,
      //       to: user.email,
      //       subject: "Welcome to iNotebook 🎉",
      //       html: `
      //   <h2>Welcome to iNotebook!</h2>
      //   <p>Hello <b>${user.name}</b>,</p>
      //   <p>Your account has been created successfully.</p>
      //   <p>Thanks for joining us! 😊</p>
      // `,

      // });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      // res.json(user);
      success = true;
      res.json({ success, authtoken });
      // it is used to catch error and 500 is used for internal error and 400 is used for user entered a bad request
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  },
);
//Route 2. Authenticate a user using POST "/api/auth/login". No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);
//Route 3. Get Loggedin user details using : POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
