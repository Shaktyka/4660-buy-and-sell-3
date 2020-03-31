'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const category = require(`../models/category`);
const log = require(`../../../paint-log`).log;
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);
const {
  HttpCode,
  DATA_SENT_MESSAGE,
  SERVER_ERROR_MESSAGE
} = require(`../../../constants`);

// Отдаёт все категории
categoriesRouter.get(`/`, asyncHandler(async (req, res) => {
  try {
    let response = await category.get();
    log(DATA_SENT_MESSAGE, `log`, `success`);
    res.json(response);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(HttpCode.INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE);
  }
}));

module.exports = categoriesRouter;
