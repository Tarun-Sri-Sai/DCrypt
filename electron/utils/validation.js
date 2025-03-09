const { MIN_PASSWORD_LENGTH } = require("../constants");

const isValidPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);
  const hasNoSpaces = !password.includes(" ");

  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigit &&
    hasSpecialChar &&
    hasNoSpaces
  );
};

module.exports = { isValidPassword };
