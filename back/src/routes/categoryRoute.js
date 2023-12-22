const { Router } = require('express');
const categoryRouter = Router();

const { Category } = require('../models');
const { verifyToken } = require('../middleware/verifyToken');

categoryRouter.post('/', verifyToken, async (req, res, next) => {
  let { categoryName } = req.body;

  try {
    const category = await new Category({ categoryName: categoryName }).save();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get('/', verifyToken, async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete('/', verifyToken, async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const category = await Category.findOneAndDelete({
      categoryName: categoryName,
    });

    res.json(category);
  } catch (error) {
    next(error);
  }
});

module.exports = { categoryRouter };
