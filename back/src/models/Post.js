const { Schema, model, Types } = require('mongoose');

const moment = require('moment');
const today = moment().format('YYYY-MM-DD HH:mm:ss');

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: [] },
  thumbnail: {
    type: String,
  },
  des: {
    type: String,
    maxlength: 200,
  },
  tags: {
    type: [String],
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  draft: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
  author: { type: Types.ObjectId, required: true, ref: 'user' },
  likes: [{ type: Types.ObjectId }],
  createdAt: { type: String, default: today },
});

const Post = model('post', PostSchema);

module.exports = { Post };
