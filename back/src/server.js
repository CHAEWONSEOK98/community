require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

const { postRouter } = require('./routes/postRoute');
const { authRouter } = require('./routes/authRoute');

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:5173' }));

    app.use('/post', postRouter);
    app.use('/auth', authRouter);

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
