const { notes } = require('../db/db.json');
const { createNote, deleteNote } = require('../lib/notes.js');
// middleware
const router = require('express').Router();

// api routes
router.get("/notes", (req, res) => {
    return res.json(notes);    
});

// post new notes.
router.post("/notes", (req, res) => {
    if (notes.length === undefined){
        req.body.id = 0
    } else {
        req.body.id = notes.length.toString();
    }
    const newNote = createNote(req.body);
    return res.json(notes)
});

// delete notes.
router.delete("/notes/:id", (req, res) => {
    deleteNote(req.params.id)
    return res.json(notes);
})

module.exports = router;