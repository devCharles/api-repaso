const bcrypt = require("bcryptjs");

const SALT_ROUND = 10;

function hash(plainText) {
  return bcrypt.hashSync(plainText, SALT_ROUND);
}

function compare(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = {
  hash,
  compare,
};
