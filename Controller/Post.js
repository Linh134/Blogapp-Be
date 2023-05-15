const Post = require("../Models/Post");
const apiError = require("../Middleware/apiError");

// Creat Post
const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content) {
    next(apiError.badRequest("This field must be fill"));
    return;
  }

  // add new post to databses
  try {
    const newPost = await Post.create({ title, content, image });
    res.status(200).json(newPost);
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
  }
};

// Get all Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
  }
};

// Get a single Post
const getPost = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    next(apiError.badRequest("Can't find this post"));
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      next(apiError.badRequest("This post don't exist"));
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
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
    if (!updatePost) {
      next(apiError.badRequest("This post don't exist"));
      return;
    }
    res.status(200).json(updatePost);
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
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
    if (!deletePost) {
      next(apiError.badRequest("This post don't exist"));
      return;
    }
    res.status(200).json(deletePost);
  } catch (error) {
    next(apiError.internalSever(`${error.message}`));
    return;
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
