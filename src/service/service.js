'use strict';

const {Cli} = require(`./cli`);
const log = require(`../paint-log.js`).log;

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  OFFERS_AMOUNT_MAX,
  ExitCode,
  Message
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const userCommand = userArguments.slice(USER_ARGV_INDEX);
const offersAmount = userCommand.slice(USER_ARGV_INDEX);

if (offersAmount > OFFERS_AMOUNT_MAX) {
  log(Message.OVERHEAD, `info`, `error`);
  process.exit(ExitCode.ERROR);
}

if (userArguments.length === 0 || !Cli[userCommand[0]]) {
  Cli[DEFAULT_COMMAND].run()
    .then(() => process.exit(ExitCode.SUCCESS))
    .catch((err) => console.log(err));
} else {
  Cli[userCommand[0]].run(offersAmount)
  .then(() => process.exit(ExitCode.SUCCESS))
  .catch((err) => console.log(err));
}

