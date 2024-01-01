require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const mongoose = require('mongoose');

const {
  authRouter,
  userRouter,
  postRouter,
  imageRouter,
  categoryRouter,
  tagRouter,
} = require('./routes/');

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    app.use('/public', express.static('public'));
    // app.use(express.static(path.join(__dirname, '../public/img')));

    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/post', postRouter);
    app.use('/image', imageRouter);
    app.use('/category', categoryRouter);
    app.use('/tag', tagRouter);

    app.use((error, req, res, next) => {
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Server Error';
      return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
      });
    });

    app.listen(PORT, () => {
      console.log('server running');
    });
  } catch (error) {
    console.log(error);
  }
};

server();
