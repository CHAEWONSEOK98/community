const { Schema, model } = require('mongoose');

const ImageSchema = new Schema(
  {
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  { timestamps: true }
);

const Image = model('image', ImageSchema);

module.exports = { Image };
