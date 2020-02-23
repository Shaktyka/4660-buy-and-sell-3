'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  res.render(`../templates/pages/search-result`);
});

module.exports = searchRouter;
