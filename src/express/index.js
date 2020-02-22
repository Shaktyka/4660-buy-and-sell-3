'use strict';

const express = require(`express`);
const loginRouter = require(`./routes/login`);
const registerRouter = require(`./routes/register`);
const myRouter = require(`./routes/my`);
const searchRouter = require(`./routes/search`);
const offersRouter = require(`./routes/offers`);

const WORK_PORT = 8080;
const app = express();

app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);
app.use(`/my`, myRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);

app.get(`/`, (req, res) => res.send(`/`));

app.listen(WORK_PORT, () =>
  console.log(`Сервер запущен на порту: ${WORK_PORT}`));
