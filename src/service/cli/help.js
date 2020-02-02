'use strict';

module.export = {
  name: `--help`,
  run() {
    const helpText = `
      Программа запускает http-сервер и формирует файл с данными для API.

      Гайд:
      server <command>

      Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
    `;
    console.info(helpText);
  }
};
