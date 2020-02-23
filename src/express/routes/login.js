'use strict';

const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => {
  res.render(`../templates/pages/login`);
});

module.exports = loginRouter;
