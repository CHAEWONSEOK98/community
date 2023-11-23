const { Schema, model, Types } = require('mongoose');

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: 'user' },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = model('post', PostSchema);

module.exports = { Post };
