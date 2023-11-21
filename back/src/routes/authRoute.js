const { Router } = require('express');
const authRouter = Router();
const { User } = require('../models/User');
const bcryptjs = require('bcryptjs');
const { errorHanlder } = require('../utils/error');
const jwt = require('jsonwebtoken');

authRouter.post('/register', async (req, res, next) => {
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

authRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHanlder(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHanlder(401, 'wrong credentials'));
    const { password: hashedPassword, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 86400e3);
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/google', async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { password: hashedPassword, ...rest } = user._doc;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const expiryDate = new Date(Date.now() + 86400e3);
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.split(' ').join('').toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();

      const { password: hashedPassword2, ...rest } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const expiryDate = new Date(Date.now() + 86400e3);
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('access_token').status(200).json('로그아웃 성공');
});

module.exports = { authRouter };
