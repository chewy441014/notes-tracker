const notes = require('express').Router();
// using a json as a data base before learning MySQL or MongoDB
// contains user created notes, and one test note right now. 
let db = require('../db/db.json');
const fs = require('fs');
const uuid = require('../helpers/uuid.js');

notes.get('/', (req, res) => {
    // return all notes
    return res.send(db);
});

notes.delete('/:id', (req, res) => {
    // delete note with id specified
    const currentNote = req.params.id;
    let tempArr = [];
    for (let i = 0; i < db.length; i++) {
        if (!(db[i].id === currentNote)) {
            tempArr.push(db[i]);
        }
    }
    db = tempArr;
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
        err ? console.error(err) : console.info(`\nData written to json file`))
    return res.send('delete stuff');
});

notes.post('/', (req, res) => {
    // save the note and write it to file
    if (req.body) {
        req.body.id = uuid();
        db.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
        err ? console.error(err) : console.info(`\nData written to json file`))
    }
    return res.send('post stuff');
});

module.exports = notes;