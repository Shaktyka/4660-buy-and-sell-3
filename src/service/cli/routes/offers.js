'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;

const MOCKS_FILE = `mocks.json`;
// const log = require(`../../../paint-log.js`).log;
// const DATA_SENT_MESSAGE = `Данные отправлены`;

// //////////////// МОДЕЛЬ ///////////////////////////

// Объект offers
const offers = {
  getList: async () => {
    const offersList = await readFileData(MOCKS_FILE);
    return offersList;
  },

  getOffer: async (id) => {
    let offer = {};
    const offersList = await offers.getList();
    const parsedList = JSON.parse(offersList);

    for (let i = 0; i < parsedList.length; i++) {
      if (parsedList[i].id === id) {
        offer = parsedList[i];
        break;
      }
    }

    return offer;
  },

  getOfferComments: async (id) => {
    let comments = [];
    const offer = await offers.getOffer(id);

    if (offer.hasOwnProperty(`comments`)) {
      comments = offer.comments;
    }

    return comments;
  }
};


// //////////////// РОУТЫ ///////////////////////////

// Отдаёт список всех объявлений
offersRouter.get(`/`, async (req, res) => {
  const result = await offers.getList();
  res.json(result);
});

// Отдаёт объявление по id
offersRouter.get(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
  }

  const result = await offers.getOffer(offerId);
  res.json(result);
});

// Отдаёт комментарии выбранного объявления
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
  }

  const result = await offers.getOfferComments(offerId);
  res.json(result);
});

// Создаёт новое объявление
offersRouter.post(`/`, (req, res) => {
  res.send(`new offer`);
});

// Cоздаёт новый комментарий
offersRouter.put(`/:offerId/comments`, (req, res) => {
  res.send(`create new comment`);
});

// Редактирует определённое объявление
offersRouter.put(`/:offerId`, (req, res) => {
  res.send(`update new offer`);
});

// Удаляет определённое объявление
offersRouter.delete(`/:offerId`, (req, res) => {
  res.send(`delete new offer`);
});

// Удаляет из объявления комментарий с id
offersRouter.delete(`/:offerId/comments/:commentId`, (req, res) => {
  res.send(`delete new offer`);
});

module.exports = offersRouter;
