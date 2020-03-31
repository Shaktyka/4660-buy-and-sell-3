'use strict';

const readFileData = require(`../../../utils.js`).readFileData;

const CATEGORIES_FILE = `data/categories.txt`;

const category = {
  get: async () => {
    let categories = await readFileData(CATEGORIES_FILE);
    categories = categories.split(`\n`).filter((categoryName) => categoryName.length > 0);
    return categories;
  }
};

module.exports = category;
