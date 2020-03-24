'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const OFFERS_AMOUNT_MAX = 1000;
const DEFAULT_SERVER_PORT = 3000;

const Message = {
  OVERHEAD: `Не больше 1000 объявлений`
};

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT:204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  OFFERS_AMOUNT_MAX,
  DEFAULT_SERVER_PORT,
  ExitCode,
  Message,
  HttpCode
};
