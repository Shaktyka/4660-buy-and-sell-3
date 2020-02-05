'use strict';

const http = require(`http`);
const log = require(`../../paint-log.js`).log;
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;

const StatusCode = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

// Ответ сервера
const onClientConnect = (request, response) => {

  switch (request.url) {
    case `/`:
      // const responseText = getResponseText([]);

      response.writeHead(StatusCode.OK, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      response.end();
      break;

    default:
      response.writeHead(StatusCode.NOT_FOUND, {
        'Content-Type': `text/plain; charset=UTF-8`,
      });
      response.end(NOT_FOUND_MESSAGE);
  };
};

// Рендерим список данных для возвращения клиенту
const renderResponseText = (stringsArray) => {
  const listString = `<ul>`;
  stringsArray.forEach((string) => {
    listString += `<li>${string}</li>`;
  });
  listString += `</ul>`;
  return listString;
};

// Экспорт
module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
     .listen(port)
     .on(`listening`, (err) => {
        if (err) {
          return console.error(`Ошибка при создании сервера`, err);
        }
        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
     });
  }
};
