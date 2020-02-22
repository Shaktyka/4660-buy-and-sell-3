'use strict';

const path = require(`path`);
const express = require(`express`);
const loginRouter = require(`./routes/login`);
const registerRouter = require(`./routes/register`);
const myRouter = require(`./routes/my`);
const searchRouter = require(`./routes/search`);
const offersRouter = require(`./routes/offers`);

const WORK_PORT = 8080;
const app = express();

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);
app.use(`/my`, myRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);

app.get(`/`, (req, res) => {
  res.render(`./pages/index`);
});

app.listen(WORK_PORT, () =>
  console.log(`Сервер запущен на порту: ${WORK_PORT}`));
