'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;
const log = require(`../../../paint-log.js`).log;

const MOCKS_FILE = `mocks.json`;
const MESSAGE_BAD_REQUEST = `Неверный запрос`;
const MESSAGE_FAIL = `Ошибка сервера: не удалось получить данные`;
// const DATA_SENT_MESSAGE = `Данные отправлены`;

const search = {
  getList: async () => {
    const offersList = await readFileData(MOCKS_FILE);
    return offersList;
  },

  getMatches: async (text) => {
    const offers = await search.getList();
    const parsedOffers = JSON.parse(offers);
    const matches = [];
    const regExp = new RegExp(text, `gi`);

    parsedOffers.filter((offer) => {
      if (offer.title.match(regExp)) {
        matches.push(offer);
      }
    });

    return matches;
  }
};

// Не работает, нужно проверять
// Поиск объявления по заголовкам
searchRouter.get(`/`, async (req, res) => {
  const queryString = req.query.query.trim();
  if (queryString.length === 0) {
    res.status(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await search.getMatches(queryString);
    res.json(result);
    log(`...`, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = searchRouter;
