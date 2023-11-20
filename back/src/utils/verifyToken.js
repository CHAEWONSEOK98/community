const jwt = require('jsonwebtoken');
const { errorHanlder } = require('../utils/error');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHanlder(401, '인증되지 않았습니다.'));

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(errorHanlder(403, '토큰이 유효하지 않습니다.'));

    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
