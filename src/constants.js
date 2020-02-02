'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 1;

const ExitCode = {
  success: 0,
  error: 1
};

module.export = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
};
