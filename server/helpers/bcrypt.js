const bcrypt = require("bcryptjs");
const saltRound = 5;

const encrypt = (password) => {
  return bcrypt.hashSync(password, saltRound);
};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
  encrypt,
  comparePassword,
};
