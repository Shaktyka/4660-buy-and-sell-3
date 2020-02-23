'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

// offersRouter.get(`/`, (req, res) => res.send(`/offers`));

offersRouter.get(`/add`, (req, res) => {
  res.render(`../templates/pages/new-ticket`);
});

offersRouter.get(`/:id`, (req, res) => {
  const offersId = Number.parseInt(req.params.id, 10);
  res.send(`/offers/:id ${offersId}`);
});

offersRouter.get(`/category/:id`, (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);
  res.send(`/offers/category/:id ${categoryId}`);
});

offersRouter.get(`/edit/:id`, (req, res) => {
  const offerId = Number.parseInt(req.params.id, 10);
  res.send(`/offers/edit/:id ${offerId}`);
});

module.exports = offersRouter;
