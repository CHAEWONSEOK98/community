const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Post = model('post', PostSchema);

module.exports = { Post };
