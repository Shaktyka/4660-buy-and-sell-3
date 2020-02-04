'use strict';

const log = require(`../../paint-log.js`).log;

const HELP_TEXT = `
  Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
  server <command>

  Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  async run() {
    let result = null;
    try {
      result = await log(HELP_TEXT, `info`, `help`);
    } catch (err) {
      result = err;
    }
    return result;
  }
};
