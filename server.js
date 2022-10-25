const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('*', (req, res) =>
  res.send(`Use a correct URL or correct request.`));

app.listen(PORT, () => {
    console.log(`Starting server on PORT ${PORT}`)
});