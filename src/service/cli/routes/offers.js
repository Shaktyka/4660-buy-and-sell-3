'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const log = require(`../../../paint-log`).log;
const offers = require(`../models/offers`);
const validation = require(`../../../validation`);

const Message = {
  COMMENT_DELETED: `Комментарий удалён`,
  OFFER_DELETED: `Объявление удалено`,
  OFFER_UPDATED: `Объявление отредактировано`,
  COMMENT_CREATED: `Комментарий добавлен`,
  DATA_SENT: `Данные отправлены`,
  OFFER_CREATED: `Объявление добавлено`
};

const MESSAGE_FAIL = `Ошибка сервера: не удалось получить данные`;
const MESSAGE_BAD_REQUEST = `Неверный запрос`;


// Отдаёт список всех объявлений
offersRouter.get(`/`, async (req, res) => {
  try {
    const result = await offers.getList();
    log(Message.DATA_SENT, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

// Отдаёт объявление по id
offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const offerId = req.params.offerId.trim();
    const result = await offers.getOffer(offerId);
    log(Message.DATA_SENT, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

// Отдаёт комментарии объявления по id
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    return res.sendStatus(404);
  }

  try {
    const result = await offers.getOfferComments(offerId);
    log(Message.DATA_SENT, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

// //////////////// Доделать //////////////////////////////

// Создаёт новое объявление
offersRouter.post(`/`, (req, res) => {
  const offerData = req.body;
  const validityResult = validation.validateOffer(offerData);
  if (validityResult.isValid) {
    const result = offers.addOffer(offerData);
    // Возвращает список объявлений с новым объявлением
    // return res.json(result);
    // log(Message.OFFER_CREATED, `log`, `success`);
  } else {
    // Отправить массив ошибок validityResult.errors
  }
});

// Редактирует объявление по id
offersRouter.put(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    return res.sendStatus(400).send(MESSAGE_BAD_REQUEST);
  }

  const offerData = req.body;
  const result = await offers.updateOffer(offerId, offerData);

  log(Message.OFFER_UPDATED, `log`, `success`);
  return res.json(result);
});

// //////////////////////////////////////////////

// Cоздаёт новый комментарий для объявления с id
offersRouter.put(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  const params = req.body;

  if (offerId.length === 0 || !params.hasOwnProperty(`comment`)) {
    return res.sendStatus(400).send(MESSAGE_BAD_REQUEST);
  }

  const validityResult = validation.validateComment(params.comment);

  if (!validityResult.isValid) {
    return res.status(400).send(validityResult.errors);
  }

  try {
    const result = await offers.addComment(offerId, params.comment);
    log(Message.COMMENT_CREATED, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

// Удаляет объявление по id
offersRouter.delete(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    return res.status(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await offers.deleteOffer(offerId);
    log(Message.OFFER_DELETED, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

// Удаляет из объявления id комментарий с id
offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  const commentId = req.params.commentId.trim();
  if (offerId.length === 0 || commentId === 0) {
    return res.sendStatus(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await offers.deleteComment(offerId, commentId);
    log(Message.COMMENT_DELETED, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    return res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = offersRouter;
