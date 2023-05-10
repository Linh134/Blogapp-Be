const Post = require("../Models/Post");

// Creat Post
const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: " Pls fill in all fields" });
  }

  // add new post to databses
  try {
    const newPost = await Post.create({ title, content, image });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get a single Post
const getPost = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ error: "This post don't exist" });
  }
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a Post
const updatePost = async (req, res) => {
  const id = req.params.id;

  try {
    const updatePost = await Post.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { ...req.body }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const deletePost = await Post.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
