const { Post } = require('../models');

const { isValidObjectId, default: mongoose } = require('mongoose');

const getCategory = async (req, res) => {
  try {
    const { lastId } = req.query;
    const { categoryState } = req.body;

    if (lastId && !mongoose.isValidObjectId(lastId)) {
      throw new Error('invalid lastId');
    }

    if (categoryState === 'All') {
      let posts = await Post.find(
        lastId
          ? { draft: false, isPublic: true, _id: { $lt: lastId } }
          : { draft: false, isPublic: true }
      )
        .sort({ _id: -1 })
        .select('title createdAt des tags username')
        .limit(10);
      return res.send({ posts });
    } else {
      let posts = await Post.find(
        lastId
          ? {
              category: categoryState,
              draft: false,
              isPublic: true,
              _id: { $lt: lastId },
            }
          : { category: categoryState, draft: false, isPublic: true }
      )
        .sort({ _id: -1 })
        .select('title createdAt des tags username')
        .limit(10);
      return res.send({ posts });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getCategory };
