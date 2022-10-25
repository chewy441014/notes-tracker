// initialize fs, uuid, db, and notes
// create a router object
const notes = require('express').Router();
// using a json as a data base before learning MySQL or MongoDB
// contains user created notes, and one test note right now. 
let db = require('../db/db.json');
const fs = require('fs');
const uuid = require('../helpers/uuid.js');

// get calls made to /api/notes returns the json object
notes.get('/', (req, res) => {
    // return all notes
    return res.send(db);
});

// delete calls made to /api/notes filters the db array and re-writes it to db.json
notes.delete('/:id', (req, res) => {
    // delete note with id specified
    const currentNote = req.params.id;
    db = db.filter((note) => !(note.id === currentNote));
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
        err ? console.error(err) : console.info(`\nData written to json file`));
    return res.send('delete stuff');
});

// post calls made to /api/notes appends the db array and re-writes it to db.json
notes.post('/', (req, res) => {
    // save the note and write it to file
    if (req.body) {
        let tempID = uuid();
        if (db.filter((note) => {note.id === tempID}).length === 0) {
            req.body.id = tempID;
        }
        db.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
        err ? console.error(err) : console.info(`\nData written to json file`))
    }
    return res.send('post stuff');
});

module.exports = notes;