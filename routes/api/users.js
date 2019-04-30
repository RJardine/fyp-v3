const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
// model
const User = require("../../models/User");

// @route   POST api/users
// @desc   Register user
// @access  public
router.post(
  "/",
  [
    //   validation for registration using express-validator
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "Password must be atleast 6 or more characters").isLength(
      { min: 6 }
    )
  ],
  async (req, res) => {
    //    handle response
    const errors = validationResult(req);
    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destrcture req.body
    const { name, password } = req.body;
    const email = req.body.email.toLowerCase();

    try {
      // see if user exists through email
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      // get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });
      //encrypt password bcrypt
      //   create salt
      const salt = await bcrypt.genSalt(10);
      // hash password
      user.password = await bcrypt.hash(password, salt);

      // save user to the database
      await user.save();

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
        { expiresIn: 360000 },
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
