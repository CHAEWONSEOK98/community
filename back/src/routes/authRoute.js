const { Router } = require('express');
const authRouter = Router();
const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { errorHanlder } = require('../utils/error');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/verifyToken');

authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/refresh', (req, res, next) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(400).json('Refresh Token이 없습니다.');

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
    error && next(error);

    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '10m',
      }
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });
  });
});

authRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHanlder(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHanlder(401, 'wrong credentials'));
    const { password: hashedPassword, ...rest } = validUser._doc;

    const accessToken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '10m',
      }
    );
    const refreshToken = jwt.sign(
      { id: validUser._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res.status(200).json({ rest, accessToken, refreshToken });
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

authRouter.delete('/:userId', verifyToken, async (req, res, next) => {
  try {
    await User.findOneAndDelete({
      _id: req.params.userId,
    });
    res.status(200).json('삭제되었습니다.');
  } catch (error) {
    next(error);
  }
});

module.exports = { authRouter };
