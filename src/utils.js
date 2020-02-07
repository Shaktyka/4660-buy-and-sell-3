'use strict';

const log = require(`./paint-log.js`).log;
const fs = require(`fs`).promises;

// Генерация рандомных чисел
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Перемешивание массива
const shuffleArray = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

// Читает данные из файла
const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    log(err, `error`, `error`);
    return [];
  }
};

module.exports = {
  getRandomInt,
  shuffleArray,
  readContent
};
