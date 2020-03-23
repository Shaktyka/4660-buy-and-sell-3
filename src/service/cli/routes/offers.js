'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;
const nanoid = require(`nanoid`);

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
  },

  addComment: async (id, comment) => {
    const offer = await offers.getOffer(id);
    offer.comments.push({id: nanoid(6), text: comment});
    return offer;
  },

  addOffer: async (offerData) => {
    const offersList = await offers.getList();
    const parsedList = JSON.parse(offersList);

    const offerObject = offerData;
    offerObject.id = nanoid(6);

    parsedList.push(offerObject);
    return parsedList;
  },

  updateOffer: async (id, offerData) => {
    const offer = await offers.getOffer(id);
    // Цикл по offer и обновление полей
    
 
    return offer;
  },

  deleteOffer: async (id) => {
    const offersList = await offers.getList();
    const parsedList = JSON.parse(offersList);

    const filteredList = parsedList.filter((offer) => {
      return offer.id !== id;
    });

    return filteredList;
  },

  deleteComment: async (offerId, commentId) => {
    const offer = await offers.getOffer(offerId);
    offer.comments = offer.comments.filter((comment) => {
      return comment.id !== commentId;
    });

    return offer;
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

// Отдаёт комментарии объявления по id
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
  }

  const result = await offers.getOfferComments(offerId);
  res.json(result);
});

// Создаёт новое объявление
offersRouter.post(`/`, async (req, res) => {
  const offerData = req.body;
  // Проверки полей
  const result = await offers.addOffer(offerData);
  // Возвращает список объявлений с новым объявлением
  res.json(result);
});

// Cоздаёт новый комментарий
offersRouter.put(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(400);
  }

  // Коммент required! Минимум 20 символов;
  // params.comment.length < 20
  const params = req.body;
  if (params.comment.length >= 20) {
    const result = await offers.addComment(offerId, params.comment);
    res.json(result);
  } else {
    res.sendStatus(400);
  }
});

// Редактирует объявление по id
offersRouter.put(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(400);
  }

  const offerData = req.body;
  const result = await offers.updateOffer(offerId, offerData);
  // Возвращает список объявлений с обновлённым объявлением
  res.json(result);
});

// Удаляет объявление по id
offersRouter.delete(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(400);
  }

  const result = await offers.deleteOffer(offerId);
  res.json(result);
});

// Удаляет из объявления id комментарий с id
offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  const commentId = req.params.commentId.trim();
  if (offerId.length === 0 || commentId === 0) {
    res.sendStatus(400);
  }

  const result = await offers.deleteComment(offerId, commentId);
  res.json(result);
});

module.exports = offersRouter;
