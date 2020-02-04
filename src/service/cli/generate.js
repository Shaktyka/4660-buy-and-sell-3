'use strict';

const {getRandomInt, shuffleArray} = require(`../../utils`);
const log = require(`../../paint-log.js`).log;

const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Продам коллекцию журналов «Огонёк»`,
  `Отдам в хорошие руки подшивку «Мурзилка»`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const DESCRIPTIONS = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

const ResultWriteMessage = {
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
      log(`info`, `success`, ResultWriteMessage.SUCCESS);
    } catch (err) {
      log(`error`, `error`, ResultWriteMessage.ERROR);
    }
  }
};
