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
  SUCCESS: `green`,
  DEFAULT: `white`
};

module.exports = {
  log(text, method, type) {
    method = method.toUpperCase();
    type = ColorByType[type.toUpperCase()];
    LogMethod[method](chalk[type](text));
  }
};
