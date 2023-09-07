import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    color: Joi.string().optional(),
    isArchive: Joi.boolean()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};

export const updateNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3),
    color: Joi.string()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};
