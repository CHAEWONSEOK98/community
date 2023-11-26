const { Router } = require('express');
const userRouter = Router();
const { verifyToken } = require('../utils/verifyToken');
const { errorHanlder } = require('../utils/error');
const { User } = require('../models');
const bcryptjs = require('bcryptjs');

userRouter.post('/update/:userId', verifyToken, async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHanlder(401, '본인 계정만 업데이트 가능합니다.'));
  }

  try {
    // if (req.body.password) {
    //   req.body.password = bcryptjs.hashSync(req.body.password, 10);
    // }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          //   password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter };
