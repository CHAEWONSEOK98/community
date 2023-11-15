const { Router } = require('express');
const authRouter = Router();
const { User } = require('../models/User');
const bcryptjs = require('bcryptjs');

authRouter.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { authRouter };
