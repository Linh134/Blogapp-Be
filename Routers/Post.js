const express = require("express");
const protect = require("../Middleware/Auth");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../Controller/Post");

const router = express.Router();

// POST a new post
router.post("/", protect, createPost);

// GET all post
router.get("/", protect, getPosts);

// GET a post
router.get("/:id", protect, getPost);

// UPDATE a post
router.put("/:id", protect, updatePost);

// DELETE a post
router.delete("/:id", protect, deletePost);

module.exports = router;
