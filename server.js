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
    return "added note."
}

function deleteNote (rId) {
  const newDb = notes.filter(note => note.id != rId);
  notes.splice(rId, 1);

  for (let i = 0; i < newDb.length; i++) {
      newDb[i].id = `${i}`
  }
  
  fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify({
          notes: newDb
        }, null, 2)
    )

    return notes
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
    if (notes.length === undefined){
        req.body.id = 0
    } else {
        req.body.id = notes.length.toString();
    }
    const newNote = createNote(req.body);
    return res.json(notes)
});

// delete notes.
app.delete("/api/notes/:id", (req, res) => {
    deleteNote(req.params.id)
    
    return res.json(notes);
})


// Server listen.
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});