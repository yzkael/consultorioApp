import nodemailer from 'nodemailer';
import { transporterConfig } from '../config/configs';

const transporter = nodemailer.createTransport(transporterConfig);

interface EmailType {
  to: string;
  subject: string;
  text: string; // Changed from bodyText to text
}

const sendEmail = ({ to, subject, text }: EmailType) => {
  const mailOptions = {
    from: transporterConfig.auth.user, // Use the email address from the transporter config
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Logging the error
        reject(error);
      } else {
        console.log('Email sent:', info.response); // Logging the success response
        resolve(info);
      }
    });
  });
};

export default sendEmail;
