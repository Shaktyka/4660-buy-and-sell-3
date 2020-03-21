'use strict';

const log = require(`../../../paint-log.js`).log;
const {Router} = require(`express`);
const categoriesRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;

const CATEGORIES_FILE = `data/categories.txt`;
const DATA_SENT_MESSAGE = `Данные отправлены`;

// Модель
const category = {
  get: async () => {
    let categories = await readFileData(CATEGORIES_FILE);
    categories = categories.split(`\n`).filter((it) => it.length > 0);
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
    console.log(err);
  }
});

module.exports = categoriesRouter;
