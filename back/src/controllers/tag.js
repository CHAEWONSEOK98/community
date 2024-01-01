const { Post } = require('../models');

const getTags = async (req, res, next) => {
  try {
    let tags = await Post.find({ draft: false, isPublic: true }).select(
      'tags -_id'
    );

    return res.status(200).send(tags);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTags };
