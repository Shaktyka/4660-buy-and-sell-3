'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 1;
const OFFERS_AMOUNT_MAX = 1000;

const Message = {
  overhead: `Не больше 1000 объявлений`
};

const ExitCode = {
  success: 0,
  error: 1
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  OFFERS_AMOUNT_MAX,
  ExitCode,
  Message
};