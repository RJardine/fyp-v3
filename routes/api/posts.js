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

// @route   GET api/posts
// @desc     route to get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // get posts
    const posts = await PostModel.find().sort({ date: -1 });
    // return posts
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/posts/:id
// @desc     route to get post by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    // get post
    const post = await PostModel.findById(req.params.id);
    //   if they is a post with that id
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }
    // return post
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/posts/:id
// @desc     route to delete post by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // find the post
    const post = await PostModel.findById(req.params.id);

    //   handle if user doesnt exist
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }

    // make sure the correct user is deleting the post
    if (post.user.toString() !== req.user.id) {
      // not match
      return res.status(401).json({ msg: "User not Authorized" });
    }

    // remove
    await post.remove();

    // return
    res.json({ msg: "Post has been removed" });

    // return post
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
