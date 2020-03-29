'use strict';

const log = require(`./paint-log.js`).log;
const fs = require(`fs`).promises;

const NOT_FOUND_MESSAGE = `Файл не найден`;
const EMPTY_FILE_MESSAGE = `Файл пустой`;

// Генерация рандомных чисел
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Поиск вхождения одного массива в другой
const compareArrays = (gotArr, targetArr) => {
  return gotArr.filter((i) => {
    return !(targetArr.indexOf(i) > -1);
  });
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

const readFileData = (fileName) => {
  let data = [];

  try {
    data = fs.readFile(fileName, `utf8`);
    if (data === ``) {
      data = [];
      log(EMPTY_FILE_MESSAGE, `error`, `error`);
    }
  } catch (err) {
    if (err.code === `ENOENT`) {
      log(NOT_FOUND_MESSAGE, `error`, `error`);
    } else {
      log(err, `error`, `error`);
    }
  }

  return data;
};

module.exports = {
  getRandomInt,
  shuffleArray,
  readContent,
  readFileData,
  compareArrays
};
