import HttpStatus from 'http-status-codes';
import * as UserNoteService from '../services/note.service';

export const createNote = async (req, res) => {
  try {
    //console.log("req-------->", req);
    const data = await UserNoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    //console.log("req-------->", req.body);
    const data = await UserNoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    console.log("params---->", req.params.id);
    const data = await UserNoteService.getById(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const archiveNote = async (req, res, next) => {
  
    try {
      const data = await UserNoteService.archiveNote(req.params.id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note archived successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };
  
  export const trashNote = async (req, res, next) => {    
    try {
      const data = await UserNoteService.trashNote(req.params.id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note trashed successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

export const deleteNote = async (req, res) => {
  try {console.log("body-----", req.body)
    await UserNoteService.deleteNote(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const updatedData = await UserNoteService.updateNoteById(req.params.id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: updatedData,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};