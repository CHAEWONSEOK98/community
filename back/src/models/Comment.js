const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const moment = require('moment');
const today = moment().format('YYYY-MM-DD HH:mm:ss');

const CommentSchema = new Schema({
  content: { type: String, required: true },
  user: { type: ObjectId, required: true, ref: 'user' },
  username: { type: String, required: true },
  profilePicture: { type: String, required: true },
  post: { type: ObjectId, required: true, ref: 'post' },
  createdAt: { type: String, default: today },
});

const Comment = model('comment', CommentSchema);

module.exports = { Comment };
