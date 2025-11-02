const nodemailer = require("nodemailer");

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "mohammaddeif.dev@gmail.com",
      pass: "xzhxtzdaszsfmdxz",
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: `E-Commerce App <mohammaddeif.dev@gmail.com>`,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transport.sendMail(mailOptions);
};

module.exports = { EmailSend };
