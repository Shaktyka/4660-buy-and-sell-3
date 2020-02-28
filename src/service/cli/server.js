'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const MOCKS_FILE = `mocks.json`;
const NOT_FOUND_MESSAGE = `Файл ${MOCKS_FILE} не найден`;
const EMPTY_FILE_MESSAGE = `Файл ${MOCKS_FILE} пустой`;
const DATA_SENT_MESSAGE = `Данные из файла ${MOCKS_FILE} отправлены`;

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`
};

const app = express();
const {Router} = require(`express`);
const router = new Router();

app.use(express.json());
app.use(`/offers`, router);

const checkMockFile = async (res) => {
  await fs.readFile(MOCKS_FILE, `utf8`)
    .then((data) => {
      if (data === ``) {
        res.send([]);
        console.log(EMPTY_FILE_MESSAGE);
      } else {
        res.json(data);
        console.log(DATA_SENT_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.code === `ENOENT`) {
        console.error(NOT_FOUND_MESSAGE);
      } else {
        console.error(err);
      }
      res.send([]);
    });
};

router.use(`/`, (req, res) => {
  checkMockFile(res);
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
