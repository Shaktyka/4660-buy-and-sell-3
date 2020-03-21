'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;

const MOCKS_FILE = `mocks.json`;
// const DATA_SENT_MESSAGE = `Данные отправлены`;
// const log = require(`../../../paint-log.js`).log;

// Модель
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

// Поиск объяаления по наменованию
searchRouter.get(`/`, async (req, res) => {
  const queryString = req.query.query.trim();
  if (queryString.length === 0) {
    res.sendStatus(404);
  }

  const result = await search.getMatches(queryString);
  res.json(result);
});

module.exports = searchRouter;
