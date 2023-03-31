const nodemailer = require('nodemailer');

    const MailTransporter = () => {
      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'HeartDiseaseDev@outlook.com',
          pass: process.env.PASSWORD 
        }
      });
      return transporter
  }

exports.MailTransporter = MailTransporter;









