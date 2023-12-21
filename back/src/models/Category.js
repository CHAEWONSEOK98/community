const { Schema, model } = require('mongoose');

const moment = require('moment');
const today = moment().format('YYYY-MM-DD HH:mm:ss');

const CategorySchema = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: String, default: today },
});

const Category = model('category', CategorySchema);

module.exports = { Category };
