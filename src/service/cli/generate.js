'use strict';

const {getRandomInt, shuffleArray} = require(`../../utils`);
const log = require(`../../paint-log.js`).log;
const fs = require(`fs`).promises;

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const FilePath = {
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  DESCRIPTIONS: `./data/descriptions.txt`
};

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
let titles = [];
let categories = [];
let descriptions = [];

// Генерация ссылки на изображение
const getPictureFileName = (integer) => {
  integer = integer < 10 ? `0${integer}` : integer;
  return `item${integer}.jpg`;
};

// Получение типа объявления
const getTypeOffer = () => {
  return Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)].toLowerCase();
};

// Читает данные из файлов
const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    log(err, `error`, `error`);
    return [];
  }
};

// Генерация одного объявления
const generateOffer = (titles, categories, descriptions) => {
  return {
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffleArray(descriptions).slice(0, getRandomInt(1, 4)).join(` `),
    type: getTypeOffer(),
    sum: getRandomInt(PriceRestrict.MIN, PriceRestrict.MAX),
    category: shuffleArray(categories).slice(0, getRandomInt(1, 3))
  };
};

// Генерация массива объявлений
const generateOffers = (amount, titles, categories, descriptions) => {
  for (let i = 0; i < amount; i++) {
    offers.push(generateOffer(titles, categories, descriptions));
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    titles = await readContent(FilePath.TITLES);
    categories = await readContent(FilePath.CATEGORIES);
    descriptions = await readContent(FilePath.DESCRIPTIONS);

    const [offersCount] = args;
    const amountOffers = Number.parseInt(offersCount, 10) || DEFAULT_AMOUNT;
    const offersInJSON = JSON.stringify(generateOffers(amountOffers, titles, categories, descriptions));

    try {
      await fs.writeFile(FILE_NAME, offersInJSON);
      log(ResultLogMessage.SUCCESS, `info`, `success`);
    } catch (err) {
      log(ResultLogMessage.ERROR, `error`, `error`);
    }
  }
};
