const { Router } = require('express');
const authRouter = Router();
const { User } = require('../models/User');
const bcryptjs = require('bcryptjs');
const { errorHanlder } = require('../utils/error');
const jwt = require('jsonwebtoken');

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

authRouter.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHanlder(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHanlder(401, 'wrong credentials'));
    const { password: hashedPassword, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});

module.exports = { authRouter };
