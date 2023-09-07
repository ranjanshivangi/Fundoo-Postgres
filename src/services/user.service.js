import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../middlewares/nodemailer.middleware';
const User = require('../models/user')(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password, salt);

  const [userData, created] = await User.findOrCreate({
    where: { email: body.email },
    defaults: body
  });
  return { userData, created };
};

//login registered user
export const loginUser = async (body) => {
  const userRegistered = await User.findOne({ where: { email: body.email } });
  if (userRegistered == null) {
    throw new Error('User does not exist with this email');
  } else {
    console.log(userRegistered.password, body.password);
    const validPassword = await bcrypt.compare(
      body.password,
      userRegistered.password
    );
    if (validPassword) {
      let token = jwt.sign(
        { email: userRegistered.email, id: userRegistered.id },
        process.env.SECRET_KEY1
      );
      return { token };
    } else {
      throw new Error('Password Invalid');
    }
  }
};

export const forgotPassword = async (body) => {
  const data = await User.findOne({ where: { email: body.email } });
  if (data == null) {
    throw new Error('User not found with this email');
  } else {
    let token = jwt.sign(
      { email: data.email, id: data.id },
      process.env.SECRET_KEY2
    );
    const result = await sendMail(data.email, token);
    console.log(result);
    return result;
  }
};

//reset password
export const resetPassword = async (body) => {
  const data = await User.findOne({ where: { id: body.id } });
  if (!data) {
    throw new Error('This user does not exist ');
  } else {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(body.password, saltRounds);
    body.passWord = hash;
    var updatedValue = await User.update(body, { where: { id: body.id } });
  }
  return updatedValue;
};
