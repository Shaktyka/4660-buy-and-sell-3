'use strict';

const packageJsonFile = require(`../../../package.json`);
const log = require(`../../paint-log.js`).log;

module.exports = {
  name: `--version`,
  async run() {
    const version = await packageJsonFile.version;
    if (version) {
      await log(version, `info`, `version`);
    }
  }
};
