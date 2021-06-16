const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendgrid {
  async send(message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({ ...message, from: process.env.SENDGRID_SENDER });
  }
}

class CreateSenderNodemailer {
  async send(message) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_SENDER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(config);

    return await transporter.sendMail({
      ...message,
      from: process.env.NODEMAILER_SENDER,
    });
  }
}

module.exports = { CreateSenderSendgrid, CreateSenderNodemailer };
