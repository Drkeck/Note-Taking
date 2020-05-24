const fs = require('fs');
const path = require('path');
const { notes } = require('../db/db.json');

function createNote (body)  {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
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
      path.join(__dirname, "../db/db.json"),
      JSON.stringify({
          notes: newDb
        }, null, 2)
    )

    return "removed note"
}

module.exports = {createNote, deleteNote};