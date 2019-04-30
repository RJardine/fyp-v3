const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// model
const ProfileModel = require("../../models/Profile");
const UserModel = require("../../models/User");
// @route   GET api/profile/me
// @desc    get current users profile private
// @access  private
router.get("/me", auth, async (req, res) => {
  try {
    //
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    // not profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    // profile exists
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
