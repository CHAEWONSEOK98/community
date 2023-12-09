const { Schema, model } = require('mongoose');

const moment = require('moment');
const today = moment().format('YYYY-MM-DD HH:mm:ss');

const ImageSchema = new Schema({
  key: { type: String, required: true },
  originalFileName: { type: String, required: true },
  createdAt: { type: String, default: today },
});

const Image = model('image', ImageSchema);

module.exports = { Image };
