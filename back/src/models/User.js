const { Schema, model, Types } = require('mongoose');

const moment = require('moment');
const today = moment().format('YYYY-MM-DD HH:mm:ss');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  likes: [{ type: Types.ObjectId }],
  createdAt: { type: String, default: today },
});

const User = model('user', UserSchema);

module.exports = { User };
