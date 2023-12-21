const { Router } = require('express');
const categoryRouter = Router();

const { Category } = require('../models');
const { verifyToken } = require('../middleware/verifyToken');

categoryRouter.post('/', verifyToken, async (req, res, next) => {
  let { categoryName } = req.body;

  try {
    const category = await new Category({ category: categoryName }).save();
    res.status(200).json(category);
  } catch (error) {
    console.log('여기로 넘어온거?');
    next(error);
  }
});

module.exports = { categoryRouter };
