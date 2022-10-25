// import express and the notes router object
const express = require('express');
const notesRouter = require('./notes');

// setup the middleware (mostly blank for simple router)
const app = express();

// setup the router to listen on /api/notes
app.use('/notes', notesRouter);

module.exports = app;