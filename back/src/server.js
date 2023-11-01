require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    app.use(express.json());

    app.listen(PORT, () => {
      console.log('server running');
    });
  } catch (error) {
    console.log(error);
  }
};

server();
