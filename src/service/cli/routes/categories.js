'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const category = require(`../models/category`);
const log = require(`../../../paint-log`).log;

const DATA_SENT_MESSAGE = `Данные отправлены`;
const MESSAGE_FAIL = `Ошибка сервера: не удалось получить данные`;

// Отдаёт все категории
categoriesRouter.get(`/`, async (req, res) => {
  try {
    let response = await category.get();
    res.json(response);
    log(DATA_SENT_MESSAGE, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = categoriesRouter;
