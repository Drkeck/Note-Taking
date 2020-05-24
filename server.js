const express = require('express');
const path = require('path');
const apiRoutes = require('./routes')

// Middleware :
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use(express.static('public'));

// Port :
const PORT = process.env.PORT || 3001;

// notes portion of the site.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Server listen.
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});