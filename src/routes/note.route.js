import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';
import {
  newNoteValidator,
  updateNoteValidator
} from '../validators/note.validator';
import { redisData } from '../middlewares/redis.middleware';

const router = express.Router();

//router to create notes
router.post('', newNoteValidator, userAuth, noteController.createNote);

//router to get all notes
router.get('', userAuth, redisData, noteController.getAllNotes);

//router to get a note by id
router.get('/:id', userAuth, noteController.getNoteById);

//route to delete a note
router.delete('/:id', userAuth, noteController.deleteNote);

//route to update a note
router.put('/:id', userAuth, updateNoteValidator, noteController.updateNote);

//route to archive a note
router.put('/:id/archive', userAuth, noteController.archiveNote);

//route to trash a note
router.put('/:id/trash', userAuth, noteController.trashNote);

export default router;
