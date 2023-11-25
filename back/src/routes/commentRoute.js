const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });

const { User, Post, Comment } = require('../models');
const { isValidObjectId } = require('mongoose');

// '/post/:postId/comment'

commentRouter.post('/', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId, username } = req.body;
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ error: 'postId is invalid' });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).send({ error: 'userId is invalid' });
    }
    if (typeof content !== 'string') {
      return res.status(400).send({ error: 'content is required' });
    }
    if (typeof username !== 'string') {
      return res.status(400).send({ error: 'username is required' });
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
      username,
      post,
    });

    await comment.save();
    return res.status(201).json({ comment });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

commentRouter.get('/', async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ error: 'postId is invalid' });
    }

    const comments = await Comment.find({ post: postId });
    return res.status(200).json(comments);
  } catch (error) {}
});

module.exports = { commentRouter };
