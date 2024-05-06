const express = require('express');
const path = require("path");
const router = express.Router();

// Serve index view
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/templates', 'index.html'));
});

// Serve about us view
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates', 'about.html'));
});

module.exports = router;