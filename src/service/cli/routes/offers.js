'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const log = require(`../../../paint-log`).log;
const offers = require(`../models/offers`);
const {check, validationResult} = require(`express-validator`);
// const {body, validationResult} = require(`express-validator/check`);
// const validation = require(`../../../validation`);
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);

const {
  HttpCode,
  SERVER_ERROR_MESSAGE,
  MESSAGE_BAD_REQUEST,
  ResultMessage
} = require(`../../../constants`);

const NO_ID_MESSAGE = `Не передан id`;

const CommentRequirement = {
  minLength: {
    VALUE: 20,
    ERROR_TEXT: `Минимальное количество символов: `
  }
};

// Отдаёт список всех объявлений
offersRouter.get(`/`, asyncHandler(async (req, res) => {
  try {
    const result = await offers.getList();
    log(ResultMessage.DATA_SENT, `log`, `success`);
    res.json(result);
  } catch (err) {
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Отдаёт объявление по id
offersRouter.get(`/:offerId`, asyncHandler(async (req, res) => {
  try {
    const offerId = req.params.offerId.trim();
    const result = await offers.getOffer(offerId);
    log(ResultMessage.DATA_SENT, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Отдаёт комментарии объявления по id
offersRouter.get(`/:offerId/comments`, asyncHandler(async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: NO_ID_MESSAGE}
    );
  }

  try {
    const result = await offers.getOfferComments(offerId);
    log(ResultMessage.DATA_SENT, `log`, `success`);
    res.json(result);
  } catch (err) {
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// //////////////// Доделать //////////////////////////////

// Создаёт новое объявление
offersRouter.post(`/`, asyncHandler(async (req, res) => {
  const offerData = req.body;
  // console.log(offerData);
  // validation.validateOffer(offerData);

  try {
    // const validityResult = true;
    const result = offers.addOffer(offerData);
    log(ResultMessage.OFFER_CREATED, `log`, `success`);
    res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: err.message}
    );
  }
}));

// Редактирует объявление по id
offersRouter.put(`/:offerId`, asyncHandler(async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: NO_ID_MESSAGE}
    );
  }

  try {
    const offerData = req.body;
    const result = await offers.updateOffer(offerId, offerData);
    log(ResultMessage.OFFER_UPDATED, `log`, `success`);
    res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: err.message}
    );
  }
}));

// //////////////////////////////////////////////

// Cоздаёт новый комментарий для объявления с id
offersRouter.put(`/:offerId/comments`, [
  check(`comment`)
    .not().isEmpty()
    .trim()
    .escape()
    .isLength({min: CommentRequirement.minLength.VALUE})
    .withMessage(CommentRequirement.minLength.ERROR_TEXT + CommentRequirement.minLength.VALUE)
], asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  }

  const offerId = req.params.offerId.trim();
  const {comment} = req.body;

  try {
    const result = await offers.addComment(offerId, comment);
    log(ResultMessage.COMMENT_CREATED, `log`, `success`);
    return res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Удаляет объявление по id
offersRouter.delete(`/:offerId`, asyncHandler(async (req, res) => {
  const offerId = req.params.offerId.trim();
  if (offerId.length === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: NO_ID_MESSAGE}
    );
  }

  try {
    const result = await offers.deleteOffer(offerId);
    log(ResultMessage.OFFER_DELETED, `log`, `success`);
    res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

// Удаляет из объявления id комментарий с id
offersRouter.delete(`/:offerId/comments/:commentId`, asyncHandler(async (req, res) => {
  const offerId = req.params.offerId.trim();
  const commentId = req.params.commentId.trim();
  if (offerId.length === 0 || commentId === 0) {
    throw createError(
        HttpCode.BAD_REQUEST,
        {message: MESSAGE_BAD_REQUEST}
    );
  }

  try {
    const result = await offers.deleteComment(offerId, commentId);
    log(ResultMessage.COMMENT_DELETED, `log`, `success`);
    res.json(result);
  } catch (err) {
    log(err, `error`, `error`);
    throw createError(
        HttpCode.INTERNAL_SERVER_ERROR,
        {message: SERVER_ERROR_MESSAGE}
    );
  }
}));

module.exports = offersRouter;
