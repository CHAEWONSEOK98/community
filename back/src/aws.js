const aws = require('aws-sdk');

const s3 = new aws.S3({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESSS_KEY,
});

module.exports = { s3 };
