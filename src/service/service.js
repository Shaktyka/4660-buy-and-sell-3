'use strict';

const {Cli} = require(`./cli`);

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  OFFERS_AMOUNT_MAX,
  ExitCode,
  Message
} = require(`../constants.js`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const userCommand = userArguments.slice(USER_ARGV_INDEX);
const offersAmount = userCommand.slice(1);

if (userArguments.length === 0 || !Cli[userCommand[0]]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

if (offersAmount > OFFERS_AMOUNT_MAX) {
  console.info(Message.overhead);
  process.exit(ExitCode.error);
}

Cli[userCommand[0]].run(offersAmount);
