const { MIN_PASSWORD_LENGTH } = require("./constants");

const isValidPassword = (password) => {
  return !password.includes(" ") && password.length > MIN_PASSWORD_LENGTH;
};

module.exports = { isValidPassword };
