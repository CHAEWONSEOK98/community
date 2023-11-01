const { Router } = require('express');
const postRouter = Router();
const { Post } = require('../models/Post');

postRouter.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send({ error: 'title and content are required' });
    }
    if (typeof title !== 'string') {
      return res.status(400).send({ error: 'title must be a string' });
    }
    if (typeof content !== 'string') {
      return res.status(400).send({ error: 'content must be a string' });
    }

    let post = new Post({ title, content });
    await post.save();
    return res.send({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { postRouter };