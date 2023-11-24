const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });

const { User, Post, Comment } = require('../models');
const { isValidObjectId } = require('mongoose');

// '/post/:postId/comment'

commentRouter.post('/', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ error: 'postId is invalid' });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).send({ error: 'userId is invalid' });
    }
    if (typeof content !== 'string') {
      return res.status(400).send({ error: 'content is required' });
    }

    const [user, post] = await Promise.all([
      await User.findOne({ _id: userId }),
      await Post.findOne({ _id: postId }),
    ]);

    if (!user || !post) {
      return res.status(400).send({ error: 'user or post does not exist' });
    }

    const comment = new Comment({
      content,
      user,
      post,
    });

    await comment.save();
    return res.status(201).json({ comment });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = { commentRouter };
