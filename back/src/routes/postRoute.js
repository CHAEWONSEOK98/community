const { Router } = require('express');
const postRouter = Router();

const { User, Post, Comment } = require('../models');

const { errorHanlder } = require('../utils/error');
const { isValidObjectId } = require('mongoose');

const { commentRouter } = require('./commentRoute');

// Comment
// '/post/:postId/comment'
postRouter.use('/:postId/comment', commentRouter);

postRouter.post('/', async (req, res, next) => {
  try {
    const { title, content, userId, username } = req.body;

    if (!title.length || typeof title !== 'string') {
      return next(errorHanlder(400, 'title error'));
    }
    if (!content.blocks.length) {
      return next(errorHanlder(400, 'content is required'));
    }
    if (!isValidObjectId(userId)) {
      return next(errorHanlder(400, 'userId is invalid'));
    }
    if (!username.length || typeof username !== 'string') {
      return next(errorHanlder(400, 'username error'));
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

postRouter.post('/my', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const posts = await Post.find({ user: userId });
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.post('/my/liked-posts', async (req, res, next) => {
  try {
    const { likes } = req.body;
    const posts = await Post.find({ _id: likes });

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
    await Comment.deleteMany({ post: postId });

    // user1의 게시물에 user2가 좋아요를 눌렀을 때
    // 어느 날 user1이 게시글을 삭제한다면 user2의 좋아요 목록에서 해당 데이터를 삭제.
    let userId = await User.find({ likes: postId });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { likes: postId } });

    res.json({ message: '요청하신 게시글이 삭제되었습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

postRouter.patch('/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!isValidObjectId(postId)) {
      return res.status(400).send({ error: 'postId is invalid' });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).send({ error: 'userId is invalid' });
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { likes: userId } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { likes: postId } },
      { new: true }
    );

    res.status(201).json('좋아요 성공');
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

postRouter.patch('/:postId/unlike', async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!isValidObjectId(postId)) {
      return res.status(400).send({ error: 'postId is invalid' });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).send({ error: 'userId is invalid' });
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: userId } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { likes: postId } },
      { new: true }
    );

    res.status(201).json('좋아요 취소 성공');
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = { postRouter };
