'use strict';

const {Router} = require(`express`);
const homeRouter = new Router();

homeRouter.get(`/`, (req, res) => {
  res.render(`pages/main`);
});

module.exports = homeRouter;
