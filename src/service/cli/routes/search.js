'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const log = require(`../../../paint-log.js`).log;
const search = require(`../models/search`);
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);
const {
  HttpCode,
  EMPTY_REQUEST_MESSAGE,
  DATA_SENT_MESSAGE,
  SERVER_ERROR_MESSAGE
} = require(`../../../constants`);

// Поиск объявления по заголовкам
searchRouter.get(`/`, asyncHandler(async (req, res) => {
  const queryString = req.query.query.trim();
  if (queryString.length === 0) {
    throw createError(HttpCode.BAD_REQUEST, EMPTY_REQUEST_MESSAGE);
  }

  try {
    const result = await search.getMatches(queryString);
    log(DATA_SENT_MESSAGE, `log`, `success`);
    res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(HttpCode.INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE);
  }
}));

module.exports = searchRouter;
