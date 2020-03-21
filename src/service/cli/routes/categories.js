'use strict';

const fs = require(`fs`).promises;
const log = require(`../../../paint-log.js`).log;
const {Router} = require(`express`);
const categoriesRouter = new Router();
const CATEGORIES_FILE = `data/categories.txt`;
const NOT_FOUND_MESSAGE = `Файл ${CATEGORIES_FILE} не найден`;
const EMPTY_FILE_MESSAGE = `Файл ${CATEGORIES_FILE} пустой`;
const DATA_SENT_MESSAGE = `Данные отправлены`;

const readFileData = (fileName) => {
  let data = [];

  try {
    data = fs.readFile(fileName, `utf8`);
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

// Модель категорий
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
