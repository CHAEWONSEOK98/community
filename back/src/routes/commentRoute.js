const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const { isValidObjectId } = require('mongoose');
const { User, Post, Comment } = require('../models');

// '/post/:postId/comment'

commentRouter.post('/', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId, username, profilePicture } = req.body;
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
    if (typeof profilePicture !== 'string') {
      return res.status(400).send({ error: 'profilePicture is required' });
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
      profilePicture,
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
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

commentRouter.delete('/', async (req, res) => {
  try {
    const { commentId } = req.body;
    if (!isValidObjectId(commentId)) {
      return res.status(400).send({ error: 'commentId is invalid' });
    }

    await Comment.findOneAndDelete({ _id: commentId });
    return res.status(200).json('삭제 완료');
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = { commentRouter };
