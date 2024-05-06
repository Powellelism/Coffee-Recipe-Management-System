const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
const views = require('./routes/views');
const authViews = require('./routes/auth');
const api = require('./routes/api');

app.use('/', views);
app.use('/auth', authViews);
app.use('/api', api);

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});