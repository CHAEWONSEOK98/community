const { Router } = require('express');
const tagRouter = Router();

const { getTags } = require('../controllers/tag');

tagRouter.get('/', getTags);

module.exports = { tagRouter };
