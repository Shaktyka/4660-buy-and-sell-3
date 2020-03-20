'use strict';

const fs = require(`fs`).promises;
const log = require(`../../../paint-log.js`).log;
const {Router} = require(`express`);
const offersRouter = new Router();

const MOCKS_FILE = `mocks.json`;
const NOT_FOUND_MESSAGE = `Файл ${MOCKS_FILE} не найден`;
const EMPTY_FILE_MESSAGE = `Файл ${MOCKS_FILE} пустой`;
const DATA_SENT_MESSAGE = `Данные отправлены`;

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

offersRouter.use(`/`, (req, res) => {
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

// offersRouter.get(`/:offerId`, (req, res) => {
//   res.render(`/:offerId`);
// });

// offersRouter.get(`/:offerId/comments`, (req, res) => {
//   res.render(`/:offerId/comments`);
// });

module.exports = offersRouter;
