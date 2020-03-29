'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const log = require(`../../../paint-log`).log;
const offers = require(`../models/offers`);
const {check, validationResult} = require(`express-validator`);
const asyncHandler = require(`express-async-handler`);
const createError = require(`http-errors`);

const {
  HttpCode,
  SERVER_ERROR_MESSAGE,
  MESSAGE_BAD_REQUEST,
  ResultMessage,
  NO_ID_MESSAGE
} = require(`../../../constants`);

const CommentRequirement = {
  minLength: {
    VALUE: 20,
    ERROR_TEXT: `Минимальное количество символов`
  }
};

const OfferRequirement = {
  avatar: {
    imgType: {
      VALUE: [`jpeg`, `jpg`, `png`],
      ERROR_TEXT: `Неразрешённый тип данных`
    }
  },
  ticketName: {
    minLength: {
      VALUE: 10,
      ERROR_TEXT: `Минимальное количество символов`
    },
    maxLength: {
      VALUE: 100,
      ERROR_TEXT: `Максимальное количество символов`
    }
  },
  comment: {
    minLength: {
      VALUE: 50,
      ERROR_TEXT: `Минимальное количество символов`
    },
    maxLength: {
      VALUE: 1000,
      ERROR_TEXT: `Максимальное количество символов`
    }
  },
  price: {
    minValue: {
      VALUE: 100,
      ERROR_TEXT: `Не менее`
    }
  },
  action: {
    allowedTypes: {
      VALUE: [`buy`, `sell`],
      ERROR_TEXT: `Неразрешённое значение`
    }
  }
};

// //////////////// Доделать //////////////////////////////

// Создаёт новое объявление
offersRouter.post(`/`, [
  check(`ticket-name`)
    .not().isEmpty().withMessage(`Нужно заполнить поле`)
    .trim()
    .escape()
    .isLength({min: OfferRequirement.ticketName.minLength.VALUE})
    .withMessage(`${OfferRequirement.ticketName.minLength.ERROR_TEXT} ${OfferRequirement.ticketName.minLength.VALUE}`)
    .isLength({max: OfferRequirement.ticketName.maxLength.VALUE})
    .withMessage(`${OfferRequirement.ticketName.maxLength.ERROR_TEXT} ${OfferRequirement.ticketName.maxLength.VALUE}`),
  // check(`avatar`)
  //   .not().isEmpty()
  //   .trim()
  //   .escape()
  //   .withMessage(`Нужно загрузить изображение в формате jpg или png`),
  check(`comment`)
    .not().isEmpty().withMessage(`Нужно заполнить поле`)
    .trim()
    .escape()
    .isLength({min: OfferRequirement.comment.minLength.VALUE})
    .withMessage(`${OfferRequirement.comment.minLength.ERROR_TEXT} ${OfferRequirement.comment.minLength.VALUE}`)
    .isLength({max: OfferRequirement.comment.maxLength.VALUE})
    .withMessage(`${OfferRequirement.comment.maxLength.ERROR_TEXT} ${OfferRequirement.comment.maxLength.VALUE}`),
  // ,
  // check(`action`)
  //   .not().isEmpty()
  //   .trim()
  //   .escape()
  //   .isLength({min: 5})
  //   .withMessage(),
  // check(`price`)
  //   .not().isEmpty()
  //   .trim()
  //   .escape()
  //   .isLength({min: 5})
  //   .withMessage(),
  // check(`category`)
  //   .not().isEmpty()
  //   .trim()
  //   .escape()
  //   .isLength({min: 5})
  //   .withMessage()
], asyncHandler(async (req, res) => {
  const offerData = req.body;
  console.log(offerData);
  // validation.validateOffer(offerData);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpCode.BAD_REQUEST).json({errors: errors.array()});
  }

  try {
    // const validityResult = true;
    const result = offers.addOffer(offerData);
    log(ResultMessage.OFFER_CREATED, `log`, `success`);
    return res.json(result);
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

// Cоздаёт новый комментарий для объявления с id
offersRouter.put(`/:offerId/comments`, [
  check(`comment`)
    .not().isEmpty()
    .trim()
    .escape()
    .isLength({min: CommentRequirement.minLength.VALUE})
    .withMessage(`CommentRequirement.minLength.ERROR_TEXT CommentRequirement.minLength.VALUE`)
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
