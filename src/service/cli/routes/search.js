'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const log = require(`../../../paint-log.js`).log;
const search = require(`../models/search`);

const MESSAGE_BAD_REQUEST = `Неверный запрос`;
const MESSAGE_FAIL = `Ошибка сервера: не удалось получить данные`;
const DATA_SENT_MESSAGE = `Данные отправлены`;

// Поиск объявления по заголовкам
searchRouter.get(`/`, async (req, res) => {
  const queryString = req.query.query.trim();
  if (queryString.length === 0) {
    res.status(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await search.getMatches(queryString);
    res.json(result);
    log(DATA_SENT_MESSAGE, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = searchRouter;
