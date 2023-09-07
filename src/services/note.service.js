import sequelize, { DataTypes } from '../config/database';
import { client } from '../config/redis';

const Note = require('../models/note')(sequelize, DataTypes);

//create new note
export const newNote = async (body) => {
  const noteData = await Note.create(body);
  client.del(`NotesOfUser${body.createdBy}`, (err, reply) => {
    if (err) {
      console.error('Error deleting key from Redis:', err);
    } else {
      console.log('Key deleted from Redis:', reply);
    }
  });
  return noteData;
};

//get all notes
export const getAllNotes = async (body) => {
  const data = await Note.findAll({ where: { createdBy: body.createdBy } });
  if (data) {
    await client.set(`NotesOfUser${body.createdBy}`, JSON.stringify(data));
  }
  return data;
};

//get note by id
export const getById = async (id, body) => {
  const data = await Note.findOne({
    where: { createdBy: body.createdBy, id: id }
  });
  if (!data) {
    //if note does not exist
    throw new Error('This Note does not exist ');
  }
  return data;
};

//update a note by id
export const updateNoteById = async (id, body) => {
  const findNote = await Note.findOne({
    where: { createdBy: body.createdBy, id: id }
  });
  if (!findNote) {
    //if note does not exist
    throw new Error('This Note does not exist ');
  } else {
    client.del(`NotesOfUser${body.createdBy}`, (err, reply) => {
      if (err) {
        console.error('Error deleting key from Redis:', err);
      } else {
        console.log('Key deleted from Redis:', reply);
      }
    });
    var updatedValue = await Note.update(body, {
      where: { createdBy: body.createdBy, id: id },
      returning: true
    });
  }
  return updatedValue;
};

//archive note
export const archiveNote = async (id, body) => {
  const findNote = await Note.findOne({
    where: { createdBy: body.createdBy, id: id }
  });
  if (!findNote) {
    throw new Error('This Note does not exist ');
  } else {
    client.del(`NotesOfUser${body.createdBy}`, (err, reply) => {
      if (err) {
        console.error('Error deleting key from Redis:', err);
      } else {
        console.log('Key deleted from Redis:', reply);
      }
    });
    const archiveValue = !findNote.isArchive;
    var updatedValue = await Note.update(
      { isArchive: archiveValue },
      {
        where: { createdBy: body.createdBy, id: id },
        returning: true
      }
    );
  }
  return updatedValue;
};

//trash note
export const trashNote = async (id, body) => {
  const findNote = await Note.findOne({
    where: { createdBy: body.createdBy, id: id }
  });
  if (!findNote) {
    throw new Error('This Note does not exist ');
  } else {
    client.del(`NotesOfUser${body.createdBy}`, (err, reply) => {
      if (err) {
        console.error('Error deleting key from Redis:', err);
      } else {
        console.log('Key deleted from Redis:', reply);
      }
    });
    const trashValue = !findNote.isTrash;
    var updatedValue = await Note.update(
      { isTrash: trashValue },
      {
        where: { createdBy: body.createdBy, id: id },
        returning: true
      }
    );
  }
  return updatedValue;
};

//delete Note by id
export const deleteNote = async (id, body) => {
  const data = await Note.destroy({
    where: { createdBy: body.createdBy, id: id }
  });
  client.del(`NotesOfUser${body.createdBy}`, (err, reply) => {
    if (err) {
      console.error('Error deleting key from Redis:', err);
    } else {
      console.log('Key deleted from Redis:', reply);
    }
  });
  if (!data) {
    //if note is already deleted
    throw new Error('This Note does not exist ');
  }
  return 'note deleted succesfully';
};
