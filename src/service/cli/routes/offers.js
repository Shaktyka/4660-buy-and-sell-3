'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const nanoid = require(`nanoid`);
const log = require(`../../../paint-log`).log;
const offers = require(`../models/offers`);
// const validateOffer = require(`../../../validation`);

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
    res.json(result);
    log(Message.DATA_SENT, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

// Отдаёт объявление по id
offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const offerId = req.params.offerId.trim();
    const result = await offers.getOffer(offerId);
    res.json(result);
    log(Message.DATA_SENT, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

// Отдаёт комментарии объявления по id
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(404);
  }

  try {
    const result = await offers.getOfferComments(offerId);
    res.json(result);
    log(Message.DATA_SENT, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

// //////////////// Доделать //////////////////////////////

// Создаёт новое объявление
offersRouter.post(`/`, async (req, res) => {
  const offerData = req.body;
  const isValid = validateOffer(offerData);
  if (isValid) {
    // const result = await offers.addOffer(offerData);
    // Возвращает список объявлений с новым объявлением
    res.json(result);
    log(Message.OFFER_CREATED, `log`, `success`);
  } else {
    // Отправляет массив ошибок
  }
});

// Редактирует объявление по id
offersRouter.put(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.sendStatus(400).send(MESSAGE_BAD_REQUEST);
  }

  const offerData = req.body;
  const result = await offers.updateOffer(offerId, offerData);

  res.json(result);
  log(Message.OFFER_UPDATED, `log`, `success`);
});

// //////////////////////////////////////////////

// Cоздаёт новый комментарий для объявления с id
offersRouter.put(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  const params = req.body;

  try {
    if (offerId.length > 0 && params.comment.trim.length >= 20) {
      const result = await offers.addComment(offerId, params.comment);
      res.json(result);
      log(Message.COMMENT_CREATED, `log`, `success`);
    }
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

// Удаляет объявление по id
offersRouter.delete(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    res.status(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await offers.deleteOffer(offerId);
    res.json(result);
    log(Message.OFFER_DELETED, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

// Удаляет из объявления id комментарий с id
offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  const offerId = req.params.offerId.trim();
  const commentId = req.params.commentId.trim();
  if (offerId.length === 0 || commentId === 0) {
    res.sendStatus(400).send(MESSAGE_BAD_REQUEST);
  }

  try {
    const result = await offers.deleteComment(offerId, commentId);
    res.json(result);
    log(Message.COMMENT_DELETED, `log`, `success`);
  } catch (err) {
    log(err, `error`, `error`);
    res.status(500).send(MESSAGE_FAIL);
  }
});

module.exports = offersRouter;
