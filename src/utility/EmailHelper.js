const nodemailer = require("nodemailer");


const EmailSend = async (EmailTo, EmailText, EmailSubject) =>{

    nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
    })
    let mailOptions = {
        from: `E-Commerce App <${process.env.EMAIL_USER}>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    }

    return await transport.sendMail(mailOptions)
}


module.exports = {
    EmailSend,
};