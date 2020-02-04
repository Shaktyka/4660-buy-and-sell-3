'use strict';

const packageJsonFile = require(`../../../package.json`);
const log = require(`../../paint-log.js`).log;

module.exports = {
  name: `--version`,
  async run() {
    let result = null;
    try {
      const version = await packageJsonFile.version;
      if (version) {
        log(version, `info`, `version`);
        result = version;
      }
    } catch (err) {
      result = err;
    }
    return result;
  }
};
