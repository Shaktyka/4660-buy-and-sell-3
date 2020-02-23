'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  res.render(`../templates/pages/my-tickets`);
});

myRouter.get(`/comments`, (req, res) => {
  // res.send(`/my/comments`);
});

module.exports = myRouter;
