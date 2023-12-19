const jwt = require('jsonwebtoken');
const { errorHanlder } = require('../utils/error');
const { User } = require('../models');

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(errorHanlder(401, '인증되지 않았습니다.'));

//   jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
//     if (error) return next(errorHanlder(403, '토큰이 유효하지 않습니다.'));

//     req.user = user;
//     next();
//   });
// };

// const verifyToken = async (req, res, next) => {
//   try {
//     // 토큰 유무 확인
//     const token = req.cookies.access_token;
//     if (!token) return next(errorHanlder(401, '토큰이 없습니다.'));

//     // 토큰의 유효성 확인
//     const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     if (!decode) return next(errorHanlder(400, '토큰이 유효하지 않습니다.'));

//     // 유저 유무 확인
//     const user = await User.findOne({ _id: decode.id });
//     if (!user) {
//       return res.status(400).send('없는 유저입니다.');
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const verifyToken = async (req, res, next) => {
  try {
    // 토큰 유무 확인
    const authHeader = req.headers['authorization'];
    if (!authHeader) return next(errorHanlder(401, '토큰이 없습니다.'));

    // 토큰의 유효성 확인
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decode) return next(errorHanlder(400, '토큰이 유효하지 않습니다.'));

    // 유저 유무 확인
    const user = await User.findOne({ _id: decode.id });
    if (!user) {
      return res.status(400).send('없는 유저입니다.');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyToken };
