const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
// model
const User = require("../../models/User");

// @route   GET api/auth
// @desc    test route
// @access  public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc   Authenticate user and get token
// @access  public
router.post(
  "/",
  [
    //   validation for registration using express-validator
    check("email", "Email not valid").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    //    handle response
    const errors = validationResult(req);
    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destrcture req.body
    const { password } = req.body;
    const email = req.body.email.toLowerCase();

    try {
      // see if user exists through email
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // match password entered with password stored in db using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      // no match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // return jsonwebtoken
      //   payload
      const payload = {
        user: {
          id: user.id
        }
      };

      //   jwt
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // server error
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
