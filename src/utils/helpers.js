const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt_rounds = 10;
  const salt = bcrypt.genSaltSync(salt_rounds);
  const hashed_password = bcrypt.hashSync(password, salt);
  return hashed_password;
};

const comparePassword = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};

module.exports = { hashPassword, comparePassword };
