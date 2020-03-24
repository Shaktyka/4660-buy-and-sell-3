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
    log(DATA_SENT_MESSAGE, `log`, `success`);
    return res.json(response);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = categoriesRouter;
