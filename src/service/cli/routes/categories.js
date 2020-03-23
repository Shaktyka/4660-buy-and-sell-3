'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;
const log = require(`../../../paint-log.js`).log;

const CATEGORIES_FILE = `data/categories.txt`;
const DATA_SENT_MESSAGE = `Данные отправлены`;
const MESSAGE_FAIL = `Ошибка сервера: не удалось получить данные`;

const category = {
  get: async () => {
    let categories = await readFileData(CATEGORIES_FILE);
    categories = categories.split(`\n`).filter((categoryName) => categoryName.length > 0);
    return categories;
  }
};

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
