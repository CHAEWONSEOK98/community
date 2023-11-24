const { Router } = require('express');
const postRouter = Router();

const { User, Post } = require('../models');

const { errorHanlder } = require('../utils/error');
const { isValidObjectId } = require('mongoose');

const { commentRouter } = require('./commentRoute');

// Comment
// '/post/:postId/comment'
postRouter.use('/:postId/comment', commentRouter);

postRouter.post('/', async (req, res) => {
  try {
    const { title, content, userId, username } = req.body;

    if (typeof title !== 'string') {
      return next(errorHanlder(400, 'title is required'));
    }
    if (typeof content !== 'string') {
      return next(errorHanlder(400, 'content is required'));
    }
    if (!isValidObjectId(userId)) {
      return next(errorHanlder(400, 'userId is invalid'));
    }
    if (typeof username !== 'string') {
      return next(errorHanlder(400, 'username is required'));
    }

    let user = await User.findOne({ _id: userId });
    if (!user) return next(errorHanlder(400, 'user does not exist'));

    let post = new Post({ ...req.body, user });
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

postRouter.get('/', async (req, res) => {
  try {
    let posts = await Post.find();
    return res.send({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

postRouter.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    let post = await Post.findOne({ _id: postId });
    return res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

postRouter.post('/my', async (req, res) => {
  try {
    const { userId } = req.body;
    const posts = await Post.find({ user: userId });
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { updateTitle, updateContent } = req.body;

    await Post.findOneAndUpdate(
      { _id: postId },
      { title: updateTitle, content: updateContent },
      { new: true }
    );
    return res.json({ message: '수정완료' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

postRouter.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    await Post.findOneAndDelete({ _id: postId });
    res.json({ message: '요청하신 게시글이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { postRouter };
