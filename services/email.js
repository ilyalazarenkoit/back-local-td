const sgMail = require("@sendgrid/mail");
const { createHttpException } = require("../helpers/createHTTPexeptions");
require("dotenv").config();

const sendVerificationMail = async (email, emailVerificationToken) => {
  try {
    const { SENDGRID_API_KEY, MAIL_SENDER } = process.env;
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: MAIL_SENDER, // Change to your verified sender
      subject: "Email Verification",
      text: "and easy to do anywhere, even with Node.js",
      html: `<a href="http://localhost:3000/api/admin/email/verify/${emailVerificationToken}">Click here to verify your email</a>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log(`Email sent to ${email}`);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    throw createHttpException(
      502,
      `Sendgrid problems: ${JSON.stringify(error, null, 2)}`
    );
  }
};

module.exports = {
  sendVerificationMail,
};
