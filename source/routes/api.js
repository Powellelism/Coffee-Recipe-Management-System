const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const storeController = require('../controllers/storeController');

router.get('/get/shops', authMiddleware.authenticate, storeController.getStores);

module.exports = router;