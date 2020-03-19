'use strict';

const {getRandomInt, shuffleArray, readContent} = require(`../../utils`);
const log = require(`../../paint-log.js`).log;
const fs = require(`fs`).promises;
const nanoid = require(`nanoid`);

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;
const ID_SYMBOLS_AMOUNT = 6;

const FilePath = {
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  DESCRIPTIONS: `./data/descriptions.txt`,
  COMMENTS: `./data/comments.txt`
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

const CommentsRestrict = {
  MIN: 1,
  MAX: 10,
};

const CommentsStringsRestrict = {
  MIN: 1,
  MAX: 4,
};

const offers = [];
let titlesData = null;
let categoriesData = null;
let descriptionsData = null;
let commentsData = null;

// Генерация ссылки на изображение
const getPictureFileName = (integer) => {
  integer = integer < 10 ? `0${integer}` : integer;
  return `item${integer}.jpg`;
};

// Получение типа объявления
const getTypeOffer = () => {
  return Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)].toLowerCase();
};

// Генерация одного комментария
const getComment = (commentTexts) => {
  return {
    id: nanoid(ID_SYMBOLS_AMOUNT),
    text: commentTexts.join(` `)
  };
};

// Генерация массива комментариев
const getComments = (array, amount) => {
  const comments = [];

  for (let i = 0; i < amount; i++) {
    const commentStrings = shuffleArray(array)
      .slice(0, getRandomInt(CommentsStringsRestrict.MIN, CommentsStringsRestrict.MAX));
    const commentObj = getComment(commentStrings);
    comments.push(commentObj);
  }
  return comments;
};

// Генерация одного объявления
const generateOffer = (titles, categories, descriptions, comments) => {
  return {
    id: nanoid(ID_SYMBOLS_AMOUNT),
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffleArray(descriptions).slice(0, getRandomInt(1, 4)).join(` `),
    type: getTypeOffer(),
    sum: getRandomInt(PriceRestrict.MIN, PriceRestrict.MAX),
    category: shuffleArray(categories).slice(0, getRandomInt(1, 3)),
    comments: getComments(comments, getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX))
  };
};

// Генерация массива объявлений
const generateOffers = (amount, titlesArray, categoriesArray, descriptionsArray, commentsArray) => {
  for (let i = 0; i < amount; i++) {
    offers.push(generateOffer(titlesArray, categoriesArray, descriptionsArray, commentsArray));
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    titlesData = await readContent(FilePath.TITLES);
    categoriesData = await readContent(FilePath.CATEGORIES);
    descriptionsData = await readContent(FilePath.DESCRIPTIONS);
    commentsData = await readContent(FilePath.COMMENTS);

    titlesData = titlesData.filter((title) => title.length > 0);
    categoriesData = categoriesData.filter((category) => category.length > 0);
    descriptionsData = descriptionsData.filter((description) => description.length > 0);
    commentsData = commentsData.filter((comment) => comment.length > 0);

    const amountOffers = Number.parseInt(args, 10) || DEFAULT_AMOUNT;
    const offersInJSON = JSON.stringify(generateOffers(amountOffers, titlesData, categoriesData, descriptionsData, commentsData));

    try {
      await fs.writeFile(FILE_NAME, offersInJSON);
      log(ResultLogMessage.SUCCESS, `info`, `success`);
    } catch (err) {
      log(ResultLogMessage.ERROR, `error`, `error`);
    }
  }
};
