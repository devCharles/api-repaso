const jsonwebtoken = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function sign(payload) {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1w" });
}

function verify(token) {
  return jsonwebtoken.verify(token, JWT_SECRET);
}

module.exports = {
  sign,
  verify,
};
