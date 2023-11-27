const { Schema, model, Types } = require('mongoose');

const moment = require('moment');
const today = moment().format('YYYY-MM-DD HH:mm:ss');

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Types.ObjectId, required: true, ref: 'user' },
  username: { type: String, required: true },
  likes: [{ type: Types.ObjectId }],
  createdAt: { type: String, default: today },
});

const Post = model('post', PostSchema);

module.exports = { Post };
