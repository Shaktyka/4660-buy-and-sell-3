'use strict';

const {Cli} = require(`./cli`);
const log = require(`../paint-log.js`).log;

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  OFFERS_AMOUNT_MAX,
  ExitCode,
  OVERHEAD_MESSAGE
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
let userCommand = userArguments[0];
const amountParam = userArguments[1];
let result = null;

// Если параметры не переданы или команда не найдена
if (userArguments.length === 0 || !Cli[userCommand]) {
  userCommand = DEFAULT_COMMAND;
}

if (userCommand === `--generate` && amountParam > OFFERS_AMOUNT_MAX) {
  log(OVERHEAD_MESSAGE, `info`, `error`);
  process.exit(ExitCode.ERROR);
}

// Проверка результата
const processResult = (promice) => {
  promice
    .then(() => process.exit(ExitCode.SUCCESS))
    .catch((err) => console.log(err));
};

// Вычисление и возврат результата
result = Cli[userCommand].run(amountParam);
if (result instanceof Promise) {
  processResult(result);
}
