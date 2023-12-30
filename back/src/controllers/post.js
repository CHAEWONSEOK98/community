const { Post, User } = require('../models');

const { isValidObjectId, default: mongoose } = require('mongoose');
const { errorHanlder } = require('../utils/error');

const createOrUpdatePost = async (req, res, next) => {
  try {
    let authorId = req.user._id;
    let {
      category,
      title,
      content,
      thumbnail,
      des,
      tags,
      isPublic,
      draft,

      postId,
    } = req.body;

    if (!title.length || typeof title !== 'string') {
      return next(errorHanlder(400, 'title error'));
    }
    if (!draft) {
      if (typeof category !== 'string') {
        return next(errorHanlder(400, 'category error'));
      }
      if (!content.blocks.length) {
        return next(errorHanlder(400, 'content is required'));
      }
      if ((thumbnail && !thumbnail.length) || typeof thumbnail !== 'string') {
        return next(errorHanlder(400, 'thumbnail error'));
      }
      if ((des && des.length > 200) || typeof des !== 'string') {
        return next(errorHanlder(400, 'des error'));
      }
      if (typeof isPublic !== 'boolean') {
        return next(errorHanlder(400, 'isPublic error'));
      }
      if (typeof draft !== 'boolean') {
        return next(errorHanlder(400, 'draft error'));
      }
      if (!isValidObjectId(authorId)) {
        return next(errorHanlder(400, 'userId is invalid'));
      }
    }

    tags = tags.map((tag) => tag.toLowerCase());

    if (draft) {
      // 임시 저장 한 글 업데이트
      if (postId) {
        await Post.findOneAndUpdate(
          { _id: postId },
          {
            category,
            title,
            content,
            draft: false,
            thumbnail,
            des,
            isPublic,
            tags,
          }
        );

        return res.status(201).json('등록 완료');
      }
    } else {
      // 기존의 게시글 업데이트
      if (postId) {
        await Post.findOneAndUpdate(
          { _id: postId },
          { category, title, content, draft, thumbnail, des, isPublic, tags }
        );

        return res.status(201).json('수정 완료');
      }
    }

    let author = await User.findOne({ _id: authorId });
    if (!author) return next(errorHanlder(400, 'user does not exist'));

    let post = new Post({
      category,
      title,
      content,
      draft,
      thumbnail,
      des,
      isPublic,
      tags,
      author,
    });
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

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
        .populate('author', 'username profilePicture')
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
        .populate('author', 'username profilePicture')
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

module.exports = { createOrUpdatePost, getCategory };
