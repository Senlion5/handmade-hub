const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const { User } = require("../../models/User");
const { validate } = require("../../models/validatePost");

// Create Post
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id).select("-password");

  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user._id
  });

  const post = await newPost.save();

  res.send(post);
});

// Get All Posts
router.get("/", auth, async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.send(posts);
});

// Get Post by ID
router.get("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(400).send("The Post is not found.");
  res.send(post);
});

// Delete Post
router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.user != req.user._id)
    return res.status(401).send("User is not authorized!");

  await post.remove();

  res.send("The Post is Removed!");
});

// Like Post
router.put("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.likes.filter(like => like.user == req.user._id).length > 0)
    return res.status(400).send("The Post is already liked.");

  post.likes.unshift({ user: req.user._id });
  await post.save();

  res.send(post.likes);
});

// Unlike Post
router.put("/unlike/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.likes.filter(like => like.user == req.user._id).length === 0)
    return res.status(400).send("The Post has not been liked yet.");

  const removeIndex = post.likes
    .map(like => like.user.toString())
    .indexOf(req.user._id);
  post.likes.splice(removeIndex, 1);

  await post.save();

  res.send(post.likes);
});

// Comment on Post
router.post("/comment/:id", auth, async (req, res) => {
  const { error } = validate(req.body.comments);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id).select("-password");
  const post = await Post.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user._id
  };

  post.comments.unshift(newComment);
  await post.save();

  res.send(post.comments);
});

// Delete a Comment
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  const comment = post.comments.find(
    comment => comment._id == req.params.comment_id
  );
  const commentId = comment._id;

  if (!commentId) return res.status(404).send("The Comment does not exist.");
  if (comment.user != req.user._id)
    return res.status(401).send("User is not authorized!");

  const removeIndex = post.comments
    .map(comment => comment.user.toString())
    .indexOf(req.user._id);
  post.comments.splice(removeIndex, 1);

  await post.save();
  res.send(post.comments);
});

module.exports = router;
