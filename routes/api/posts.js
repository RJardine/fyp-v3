const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
// models
const PostModel = require("../../models/Post");
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
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/like/:id
// @desc     route to like post by id
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    // find post
    const post = await PostModel.findById(req.params.id);

    // check if post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // if not liked
    post.likes.unshift({ user: req.user.id });

    // save like
    await post.save();

    // return
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc     route to unlike post by id
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    // find post
    const post = await PostModel.findById(req.params.id);

    // check if post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    //  get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    // splice out of the array
    post.likes.splice(removeIndex, 1);

    // save unlike
    await post.save();

    // return
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/posts/comment/:id
// @desc     route to create a comenent
// @access  Private
router.post(
  "/comment/:id",
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
      // retrieve name and avatar from user commenting
      const user = await UserModel.findById(req.user.id).select("-password");
      // create post variable
      const post = await PostModel.findById(req.params.id);

      // new comment object
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      //    add post onto post comment
      post.comments.unshift(newComment);

      // save comment
      await post.save();

      //send back the comments
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc     route to delte a comenent
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // get post by id
    const post = await PostModel.findById(req.params.id);
    // get comment by from post
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // check error - check if comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    //make sure its correct user deleting comement
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //  find index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    // splice out of the array
    post.comments.splice(removeIndex, 1);

    // save delete comment
    await post.save();

    //return
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
