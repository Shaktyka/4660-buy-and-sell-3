'use strict';

const {getRandomInt, shuffleArray} = require(`../../utils`);
const log = require(`../../paint-log.js`).log;

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const ResultLogMessage = {
  SUCCESS: `Operation success. File created.`,
  ERROR: `Can't write data to file...`
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const PriceRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

let offers = [];

// Генерация ссылки на изображение
const getPictureFileName = (integer) => {
  integer = integer < 10 ? `0${integer}` : integer;
  return `item${integer}.jpg`;
};

// Получение типа объявления
const getTypeOffer = () => {
  return Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)].toLowerCase();
};

// Генерация одного объявления
const generateOffer = () => {
  return {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffleArray(DESCRIPTIONS).slice(0, getRandomInt(1, 4)).join(` `),
    type: getTypeOffer(),
    sum: getRandomInt(PriceRestrict.MIN, PriceRestrict.MAX),
    category: shuffleArray(CATEGORIES).slice(0, getRandomInt(1, 3))
  };
};

// Генерация массива объявлений
const generateOffers = (amount) => {
  for (let i = 0; i < amount; i++) {
    offers.push(generateOffer());
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const fs = require(`fs`).promises;

    const [offersCount] = args;
    const amountOffers = Number.parseInt(offersCount, 10) || DEFAULT_AMOUNT;
    const offersInJSON = JSON.stringify(generateOffers(amountOffers));

    try {
      await fs.writeFile(FILE_NAME, offersInJSON);
      log(ResultLogMessage.SUCCESS, `info`, `success`);
    } catch (err) {
      log(ResultLogMessage.ERROR, `error`, `error`);
    }
  }
};
