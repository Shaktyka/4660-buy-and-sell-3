const chalk = require('chalk');

const LogMethod = {
  LOG: console.log,
  INFO: console.info,
  ERROR: console.error
};

const ColorByType = {
  VERSION: `blue`,
  HELP: `gray`,
  ERROR: `red`,
  SUCCESS: `green`
};

module.exports = {
  log(method, type, text) {
    method = method.toUpperCase();
    type = ColorByType[type.toUpperCase()];
    LogMethod[method](chalk[type](text));
  }
};
