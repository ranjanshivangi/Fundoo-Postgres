const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = async (email, token) => {
  try {
    const testAccount = await nodemailer.createTestAccount(); //create testing account

    //create resusable transporter object using default SMTP transport
    let transporter = nodemailer.createTransport({
     service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    let info = {
      from: process.env.EMAIL, // sender address
      to: email, // list of recievers
      subject: 'Password Reset Link',
      text: 'Test',
      html: `<b>Hello<b><p>To reset password <a href="${process.env.APP_HOST}:${process.env.APP_PORT}/ResetPassword/${token}">Click Here</a></p>`
    };
    // send mail with defined transport object
    await transporter.sendMail(info);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    return error;
  }
};
