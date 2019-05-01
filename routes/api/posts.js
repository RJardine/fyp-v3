const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
// models
const PostModel = require("../../models/Post");
const ProfileModel = require("../../models/Profile");
const UserModel = require("../../models/User");

// @route   POST api/posts
// @desc     route to create a post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // retrieve name and avatar from user posting
      const user = await UserModel.findById(req.user.id).select("-password");

      // new post object
      const newPost = new PostModel({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      // save post
      const post = await newPost.save();

      //send post
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
