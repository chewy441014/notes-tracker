// import packages express, path, and import the routes from the routes folder
const express = require('express');
const path = require('path');
const routes = require('./routes/index');

// initialize the express app and port
const app = express();
const PORT = 3001;

// setup the middleware and route /api calls using the indicated index.js file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);
app.use(express.static('public'));

// any public request on root goes to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// any request to /notes redirects to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// all other requests redirect to the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//listen on that port, and send a message that the server is up
app.listen(PORT, () => {
    console.log(`Starting server on PORT ${PORT}`)
});