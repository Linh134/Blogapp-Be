const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      req: true,
    },
    image: {
      type: String,
    },
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
