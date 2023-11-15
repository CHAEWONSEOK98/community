const { Router } = require('express');
const authRouter = Router();
const { User } = require('../models/User');
const bcryptjs = require('bcryptjs');
const { errorHanlder } = require('../utils/error');

authRouter.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // res.status(500).json(error.message);
    // next(errorHanlder(300, 'something went wrong'));
    next(error);
  }
});

module.exports = { authRouter };
