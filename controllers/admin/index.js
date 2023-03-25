const { emailVerification } = require("./emailVerification");
const { reSendVerificationMail } = require("./reSend");

module.exports = {
  emailVerification,
  reSendVerificationMail,
};
