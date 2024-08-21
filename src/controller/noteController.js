const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../data/notes.json"); // path to the json file

let db = require(dbPath); // loads and parses the json file

// Function to save the db object to the json file
const saveToDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

exports.getAllNotes = (req, res) => {
  res.status(200).json(db);
};

exports.getNotesById = (req, res) => {
  const note = db.notes.find((u) => u.id == req.params.id);
  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

exports.addNote = (req, res) => {
  const newNote = req.body;
  newNote.id = db.notes.length + 1;
  db.notes.push(newNote);
  saveToDb();
  res.status(201).json(newNote);
};
exports.updateNote = (req, res) => {
  const index = db.notes.findIndex((u) => u.id == req.params.id);
  if (index != -1) {
    db.notes[index] = req.body;
    db.notes[index].id = parseInt(req.params.id);
    saveToDb();
    res.status(200).json(db.notes[index]);
  } else {
    res.status(404).json({
      message: "Note does not exist",
    });
  }
};
exports.deleteNote = (req, res) => {
  db.notes = db.notes.filter((u) => u.id != req.params.id);
  saveToDb();
  res.status(204).send();
};
exports.patchNote = (req, res) => {
  const index = db.notes.findIndex((u) => u.id == req.params.id);
  if (index != -1) {
    db.notes[index] = { ...db.notes[index], ...req.body };
    db.notes[index].id = parseInt(req.params.id);
    saveToDb();
    res.status(200).json(db.notes[index]);
  } else {
    res.status(404).json({ message: "Note does not exist" });
  }
};
