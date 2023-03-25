const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

function createAccessToken(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET);
}

module.exports = { createAccessToken };
