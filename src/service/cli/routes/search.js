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
    return res.status(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await search.getMatches(queryString);
    log(DATA_SENT_MESSAGE, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = searchRouter;
