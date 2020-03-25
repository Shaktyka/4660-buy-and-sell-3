'use strict';

const {Router} = require(`express`);
const categoriesRouter = require(`./categories`);
const searchRouter = require(`./search`);
const offersRouter = require(`./offers`);
const apiRouter = new Router();

apiRouter.use(`/offers`, offersRouter);
apiRouter.use(`/categories`, categoriesRouter);
apiRouter.use(`/search`, searchRouter);

module.exports = apiRouter;
