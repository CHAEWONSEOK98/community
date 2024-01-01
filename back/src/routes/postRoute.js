const { Router } = require('express');
const postRouter = Router();

const { User, Post, Comment } = require('../models');

const { errorHanlder } = require('../utils/error');
const { isValidObjectId, default: mongoose } = require('mongoose');
const { verifyToken } = require('../middleware/verifyToken');

const { commentRouter } = require('./commentRoute');
const {
  createOrUpdatePost,
  getCategoryPosts,
  getTagPosts,
} = require('../controllers/post');

// Comment
// '/post/:postId/comment'
postRouter.use('/:postId/comment', commentRouter);

// 게시글 생성 및 수정
postRouter.post('/', verifyToken, createOrUpdatePost);

// 게시글 카테고리로 분류하여 불러오기
postRouter.post('/category', getCategoryPosts);

// 게시글 태그로 분류하여 불러오기
postRouter.post('/tag', getTagPosts);

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

// 게시글 내역 공개 get
postRouter.post('/my/post-list/public', verifyToken, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { lastId } = req.query;

    if (userId && !mongoose.isValidObjectId(userId)) {
      throw new Error('invalid userId');
    }
    if (lastId && !mongoose.isValidObjectId(lastId)) {
      throw new Error('invalid lastId');
    }

    const posts = await Post.find(
      lastId
        ? {
            user: userId,
            draft: false,
            isPublic: true,
            _id: { $lt: lastId },
          }
        : { user: userId, draft: false, isPublic: true }
    )
      .limit(20)
      .sort({ _id: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// 게시글 내역 비공개 get
postRouter.post(
  '/my/post-list/private',
  verifyToken,
  async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { lastId } = req.query;

      if (userId && !mongoose.isValidObjectId(userId)) {
        throw new Error('invalid userId');
      }
      if (lastId && !mongoose.isValidObjectId(lastId)) {
        throw new Error('invalid lastId');
      }

      const posts = await Post.find(
        lastId
          ? {
              user: userId,
              draft: false,
              isPublic: false,
              _id: { $lt: lastId },
            }
          : { user: userId, draft: false, isPublic: false }
      )
        .limit(8)
        .sort({ _id: -1 });

      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.post('/my/liked-posts', verifyToken, async (req, res, next) => {
  try {
    const { likes } = req.body;
    const posts = await Post.find({ _id: likes });

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get('/my/save-post', async (req, res) => {
  try {
    let posts = await Post.find({ draft: true });
    return res.send({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

postRouter.put('/:postId', verifyToken, async (req, res) => {
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

postRouter.delete('/:postId', verifyToken, async (req, res) => {
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

postRouter.delete('/my/save-post/', verifyToken, async (req, res) => {
  try {
    let { postId } = req.body;

    await Post.deleteOne({ _id: postId });

    res.status(200).json('삭제 완료');
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

postRouter.patch('/:postId/like', verifyToken, async (req, res) => {
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

postRouter.patch('/:postId/unlike', verifyToken, async (req, res) => {
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
