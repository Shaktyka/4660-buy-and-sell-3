'use strict';

const {getRandomInt, shuffleArray, readContent} = require(`../../utils`);
const log = require(`../../paint-log.js`).log;
const fs = require(`fs`).promises;
const nanoid = require(`nanoid`);

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

const offers = [];
let titlesData = null;
let categoriesData = null;
let descriptionsData = null;

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
const generateOffer = (titles, categories, descriptions) => {
  return {
    id: nanoid(6),
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffleArray(descriptions).slice(0, getRandomInt(1, 4)).join(` `),
    type: getTypeOffer(),
    sum: getRandomInt(PriceRestrict.MIN, PriceRestrict.MAX),
    category: shuffleArray(categories).slice(0, getRandomInt(1, 3))
  };
};

// Генерация массива объявлений
const generateOffers = (amount, titlesArray, categoriesArray, descriptionsArray) => {
  for (let i = 0; i < amount; i++) {
    offers.push(generateOffer(titlesArray, categoriesArray, descriptionsArray));
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    titlesData = await readContent(FilePath.TITLES);
    categoriesData = await readContent(FilePath.CATEGORIES);
    descriptionsData = await readContent(FilePath.DESCRIPTIONS);

    titlesData = titlesData.filter((title) => title.length > 0);
    categoriesData = categoriesData.filter((category) => category.length > 0);
    descriptionsData = descriptionsData.filter((description) => description.length > 0);

    const amountOffers = Number.parseInt(args, 10) || DEFAULT_AMOUNT;
    const offersInJSON = JSON.stringify(generateOffers(amountOffers, titlesData, categoriesData, descriptionsData));

    try {
      await fs.writeFile(FILE_NAME, offersInJSON);
      log(ResultLogMessage.SUCCESS, `info`, `success`);
    } catch (err) {
      log(ResultLogMessage.ERROR, `error`, `error`);
    }
  }
};
