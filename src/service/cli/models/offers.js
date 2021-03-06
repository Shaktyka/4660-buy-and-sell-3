'use strict';

const readFileData = require(`../../../utils.js`).readFileData;
const nanoid = require(`nanoid`);

const MOCKS_FILE = `mocks.json`;
const ID_SYMBOLS_AMOUNT = 6;

const offers = {
  // Получаем весь список объявлений
  getAll: async () => {
    const offersList = await readFileData(MOCKS_FILE);
    return offersList;
  },

  // Получаем объявление по id
  getOffer: async (id) => {
    let offer = null;
    const offersList = await offers.getAll();
    const parsedList = JSON.parse(offersList);

    for (let i = 0; i < parsedList.length; i++) {
      if (parsedList[i].id === id) {
        offer = parsedList[i];
        break;
      }
    }
    return offer;
  },

  // Добавляет новое объявление
  addOffer: async (offerData) => {
    const offersList = await offers.getAll();
    const parsedList = JSON.parse(offersList);

    const offerObject = offerData;
    offerObject.id = nanoid(ID_SYMBOLS_AMOUNT);

    parsedList.push(offerObject);
    return parsedList;
  },

  // Обновляет данные объявления по id
  updateOffer: async (id, offerData) => {
    const offer = await offers.getOffer(id);

    offer.title = offerData[`ticket-name`];
    offer.picture = offerData.avatar;
    offer.description = offerData.comment;
    offer.type = offerData.action;
    offer.sum = offerData.price;
    offer.category = offerData.category;

    return offer;
  },

  // Удаляет объявление по id
  deleteOffer: async (id) => {
    const offersList = await offers.getAll();
    const parsedList = JSON.parse(offersList);

    const filteredList = parsedList.filter((offer) => {
      return offer.id !== id;
    });

    return filteredList;
  },

  // Получаем список комментариев объявления по id
  getComments: async (id) => {
    let comments = [];
    const offer = await offers.getOffer(id);

    if (offer.hasOwnProperty(`comments`)) {
      comments = offer.comments;
    }

    return comments;
  },

  // Добавляем комментарий в объявление по id
  addComment: async (id, comment) => {
    const offer = await offers.getOffer(id);
    if (offer) {
      offer.comments.push({id: nanoid(ID_SYMBOLS_AMOUNT), text: comment});
    }
    return offer;
  },

  // Удаляет комментарий по id в объявлении id
  deleteComment: async (offerId, commentId) => {
    const offer = await offers.getOffer(offerId);
    offer.comments = offer.comments.filter((comment) => {
      return comment.id !== commentId;
    });

    return offer;
  }
};

module.exports = offers;
