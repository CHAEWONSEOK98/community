const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: 'user' },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
    post: { type: ObjectId, required: true, ref: 'post' },
  },
  { timestamps: true }
);

const Comment = model('comment', CommentSchema);

module.exports = { Comment };
