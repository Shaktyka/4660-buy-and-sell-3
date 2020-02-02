'use strict';

const {getRandomInt, shuffleArray} = require(`../../utils`);

// Специфичный код, необходимый для выполнения команды
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

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const PriceRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

let offers = [];

// Генерация ссылки на изображение
const getPictureFileName = (integer) => {
  integer = integer.length === 1 ? `0${integer}` : integer;
  return `item${integer}.jpg`;
};

// Генерация одного объявления
const generateOffer = () => {
  return {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    description: [DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)]],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(PriceRestrict.min, PriceRestrict.max),
    category: shuffleArray(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1))
  };
};

// Генерация объявлений
const generateOffers = (amount) => {
  for (let i = 0; i < amount; i++) {
    offers.push(generateOffer());
  }
  return offers;
};

module.exports = {
  name: `--generate`,
  run(args) {
    const fs = require(`fs`);

    const [offersCount] = args;
    const amountOffers = Number.parseInt(offersCount, 10) || DEFAULT_AMOUNT;
    const offersInJSON = JSON.stringify(generateOffers(amountOffers));

    fs.writeFile(FILE_NAME, offersInJSON, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }
      return console.info(`Operation success. File created.`);
    });
  }
};
