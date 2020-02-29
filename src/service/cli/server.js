'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const log = require(`../../paint-log.js`).log;

const DEFAULT_PORT = 3000;
const MOCKS_FILE = `mocks.json`;
const NOT_FOUND_MESSAGE = `Файл ${MOCKS_FILE} не найден`;
const EMPTY_FILE_MESSAGE = `Файл ${MOCKS_FILE} пустой`;
const DATA_SENT_MESSAGE = `Данные отправлены`;

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`
};

const app = express();
const {Router} = require(`express`);
const router = new Router();

app.use(express.json());
app.use(`/offers`, router);

const readMockData = async () => {
  let data = [];

  try {
    data = await fs.readFile(MOCKS_FILE, `utf8`);
    if (data === ``) {
      data = [];
      log(EMPTY_FILE_MESSAGE, `error`, `error`);
    }
  } catch (err) {
    if (err.code === `ENOENT`) {
      log(NOT_FOUND_MESSAGE, `error`, `error`);
    } else {
      log(err, `error`, `error`);
    }
  }

  return data;
};

router.use(`/`, (req, res) => {
  const result = readMockData();

  if (result instanceof Promise) {
    result
      .then((data) => {
        res.json(data);
        log(DATA_SENT_MESSAGE, `log`, `success`);
      })
      .catch((err) => log(err, `error`, `error`));
  }
});

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args, 10) || DEFAULT_PORT;
    app.listen(port, (err) => {
      if (err) {
        return console.error(ServerLogText.ERROR, err);
      }
      return console.log(`${ServerLogText.CONNECT} ${port}`);
    });
  }
};
