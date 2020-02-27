'use strict';

const http = require(`http`);
const log = require(`./../../paint-log.js`).log;
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const MOCKS_FILE = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на `
};

// Отправляем ответ
const sendResponse = (response, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>Mocks Data</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  response.statusCode = statusCode;
  response.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(template);
};

// Рендерим список данных для возвращения клиенту
const renderContent = (offersArr) => {
  let content = ``;
  offersArr.forEach((offer) => {
    if (offer.title.length > 0) {
      content += `<li>${offer.title}</li>`;
    }
  });
  return `<ul>${content}</ul>`;
};

// Ответ сервера
const onClientConnect = async (request, response) => {
  switch (request.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(MOCKS_FILE);
        const mocksData = JSON.parse(fileContent);
        sendResponse(response, HttpCode.OK, renderContent(mocksData));
      } catch (err) {
        sendResponse(response, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      }
      break;
    default:
      sendResponse(response, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      break;
  }
};

// Экспорт
module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(ServerLogText.ERROR, err);
        }
        return log(ServerLogText.CONNECT + port, `info`, `success`);
      });
  }
};
