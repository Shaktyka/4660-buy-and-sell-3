'use strict';

const fs = require(`fs`).promises;
const log = require(`../../../paint-log.js`).log;
const {Router} = require(`express`);
const offersRouter = new Router();
// const Offer = require(`../models/offer.js`);

const MOCKS_FILE = `mocks.json`;
const NOT_FOUND_MESSAGE = `Файл ${MOCKS_FILE} не найден`;
const EMPTY_FILE_MESSAGE = `Файл ${MOCKS_FILE} пустой`;
// const DATA_SENT_MESSAGE = `Данные отправлены`;

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

// МОДЕЛЬ

// Объект offers
const offers = {
  getList: async () => {
    const offersList = await readFileData(MOCKS_FILE);
    return offersList;
  },

  getOffer: (id) => {
    let offer = {};
    const offersList = offers.getList();

    offersList.then((list) => {
      const parsedList = JSON.parse(list);
      for (let element of parsedList) {
        if (element.id === id) {
          offer = element;
        } else {
          break;
        }
      }
      // console.log(1, offer);
      return offer;
    })
    .catch((err) => log(err, `error`, `error`));
    // return offer;
  },

  getOfferComments: (id) => {
    let comments = [];
    const offer = offers.getOffer(id);
    console.log(offer);

    return comments;
  }
};


// РОУТЫ

offersRouter.get(`/`, async (req, res) => {
  const result = await offers.getList();
  res.json(result);
});

offersRouter.get(`/:offerId`, async (req, res) => {

  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
    return;
  }

  // const result = await offers.getOffer(offerId)
  // .then((data) => {
  //   console.log(3, data);
  // });

  // res.json(result);
});

// Получить комментарии выбранного объявления
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
    return;
  }

  const result = await offers.getOfferComments(offerId);
  res.json(result);
});

// Создаёт новое объявление
offersRouter.post(`/`, (req, res) => {
  res.send(`new offer`);
});

// Редактирует определённое объявление
offersRouter.put(`/:offerId`, (req, res) => {
  res.send(`update new offer`);
});

// Удаляет определённое объявление
offersRouter.delete(`/:offerId`, (req, res) => {
  res.send(`delete new offer`);
});

module.exports = offersRouter;
