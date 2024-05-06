const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const feedController = require('../controllers/feedController');

router.get('/', authMiddleware.authenticate, feedController.getFeed);

module.exports = router;