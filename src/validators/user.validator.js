import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    //req.validatedBody = value;
    next();
  }
};

export const loginUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    //req.validatedBody = value;
    next();
  }
};

export const forgetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    //req.validatedBody = value;
    next();
  }
};

export const resetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(10).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    //req.validatedBody = value;
    next();
  }
};
