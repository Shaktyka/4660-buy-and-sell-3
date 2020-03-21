'use strict';

const log = require(`../../../paint-log.js`).log;
const {Router} = require(`express`);
const searchRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;

const DATA_SENT_MESSAGE = `Данные отправлены`;

// Модель
// Надо?

// Поиск объяаления по наменованию
searchRouter.get(`/`, async (req, res) => {
  // Получить строку запроса

  res.send(`/search`);
});

module.exports = searchRouter;
