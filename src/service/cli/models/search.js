'use strict';

const readFileData = require(`../../../utils`).readFileData;

const MOCKS_FILE = `mocks.json`;

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

module.exports = search;
