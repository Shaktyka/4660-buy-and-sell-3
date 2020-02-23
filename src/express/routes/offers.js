'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => {
  res.render(`../templates/pages/new-ticket`);
});

offersRouter.get(`/:id`, (req, res) => {
  // const offersId = Number.parseInt(req.params.id, 10);
  res.render(`../templates/pages/ticket`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  // const categoryId = Number.parseInt(req.params.id, 10);
  res.render(`../templates/pages/category`);
});

offersRouter.get(`/edit/:id`, (req, res) => {
  // const offerId = Number.parseInt(req.params.id, 10);
  res.render(`../templates/pages/ticket-edit`);
});

module.exports = offersRouter;
