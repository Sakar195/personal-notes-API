const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");

router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNotesById);
router.post("/", noteController.addNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);
router.patch("/:id", noteController.patchNote);

module.exports = router;
