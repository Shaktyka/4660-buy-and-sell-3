'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => res.send(`/offers`));
offersRouter.get(`/add`, (req, res) => res.send(`/offers/add`));

offersRouter.get(`/:id`, (req, res) => res.send(`/offers/:id ${req.params.id}`)); // страница объявления
offersRouter.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id ${req.params.id}`)); // объявления определённой категории
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id ${req.params.id}`)); // редактирование объявления

// const companyId = Number.parseInt(req.params.id, 10);

module.exports = offersRouter;
