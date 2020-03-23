'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const readFileData = require(`../../../utils.js`).readFileData;
const nanoid = require(`nanoid`);
const log = require(`../../../paint-log.js`).log;

const MOCKS_FILE = `mocks.json`;

const Message = {
  COMMENT_DELETED: `Комментарий удалён`,
  OFFER_DELETED: `Объявление удалено`,
  OFFER_UPDATED: `Объявление отредактировано`,
  COMMENT_CREATED: `Комментарий добавлен`,
  DATA_SENT: `Данные отправлены`,
  OFFER_CREATED: `Объявление добавлено`
};

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

// //////////////// РОУТЫ /////////////////////

// Отдаёт список всех объявлений
offersRouter.get(`/`, async (req, res) => {
  const result = await offers.getList();
  res.json(result);
  log(Message.DATA_SENT, `log`, `success`);
});

// Отдаёт объявление по id
offersRouter.get(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
  }

  const result = await offers.getOffer(offerId);
  res.json(result);
  log(Message.DATA_SENT, `log`, `success`);
});

// Отдаёт комментарии объявления по id
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
  }

  const result = await offers.getOfferComments(offerId);
  res.json(result);
  log(Message.DATA_SENT, `log`, `success`);
});

// Создаёт новое объявление
offersRouter.post(`/`, async (req, res) => {
  const offerData = req.body;
  // Проверки полей
  const result = await offers.addOffer(offerData);
  // Возвращает список объявлений с новым объявлением
  res.json(result);
  log(Message.OFFER_CREATED, `log`, `success`);
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
    log(Message.COMMENT_CREATED, `log`, `success`);
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

  res.json(result);
  log(Message.OFFER_UPDATED, `log`, `success`);
});

// Удаляет объявление по id
offersRouter.delete(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(400);
  }

  const result = await offers.deleteOffer(offerId);
  res.json(result);
  log(Message.OFFER_DELETED, `log`, `success`);
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
  log(Message.COMMENT_DELETED, `log`, `success`);
});

module.exports = offersRouter;
