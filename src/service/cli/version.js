'use strict';

const packageJsonFile = require(`../../../package.json`);
const log = require(`../../paint-log.js`).log;

module.exports = {
  name: `--version`,
  run() {
    log(packageJsonFile.version, `info`, `version`);
  }
};
