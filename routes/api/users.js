const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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
  (req, res) => {
    //    handle response
    const errors = validationResult(req);
    // check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("users route working");
  }
);

module.exports = router;
