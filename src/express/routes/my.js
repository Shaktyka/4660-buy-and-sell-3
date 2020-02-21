'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.send(`/my`));

// /my/comments — комментарии к публикациям

module.exports = myRouter;
