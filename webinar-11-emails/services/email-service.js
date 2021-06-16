const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;

    switch (env) {
      case "development":
        this.link = `http://localhost:${process.env.PORT || 3000}`;
        break;

      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = `http://localhost:${process.env.PORT || 3000}`;
        break;
    }
  }

  #createVerificationEmailTeamplate(verifyToken, name) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "Larisa Systems",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: name,
        intro:
          "Welcome to Larisa Systems! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with Larisa Systems, please click here:",
          button: {
            color: "#ADC780",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    return emailBody;
  }

  async sendVerifictionEmail(verifyToken, email, name) {
    const emailBody = this.#createVerificationEmailTeamplate(verifyToken, name);

    const message = {
      to: email,
      subject: "Verify Your Account with Larisa Systems",
      html: emailBody,
    };

    const result = await this.sender.send(message);

    console.log(result);
  }
}

module.exports = EmailService;
