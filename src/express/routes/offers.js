'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => res.send(`/offers`));

// /offers/category/:id — объявления определённой категории
// /offers/add — страница создания нового объявления
// /offers/edit/:id — редактирование объявления
// /offers/:id — страница объявления

module.exports = offersRouter;
