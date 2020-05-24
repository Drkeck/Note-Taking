const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');

// Middleware :
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Port :
const PORT = process.env.PORT || 3001;

// Create functions

function createNote (body)  {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ notes }, null, 2)
    )
}

function deleteNote (rId) {
    for (let i = 0; i < notes.length; i++) {
            let currentNote = notes[i]
        if (rId === currentNote.id) {
            
        }
    }
}

// Api Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes", (req, res) => {

    return res.json(notes);
    
});

// post new notes.
app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = createNote(req.body);
});

// delete notes.
app.delete("/api/notes/:id", (req, res) => {
    console.log("delete note id: " + req.params.id);
    console.log(req.params);
    //const removeID = deleteNote(req.params.id)

})


// Server listen.
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});