'use strict';

const express = require(`express`);
const path = require(`path`);
const homeRouter = require(`./routes/home-routes`);
const loginRouter = require(`./routes/login-routes`);
const registerRouter = require(`./routes/register-routes`);
const myRouter = require(`./routes/my-routes`);
const searchRouter = require(`./routes/search-routes`);
const offersRouter = require(`./routes/offers-routes`);

const WORK_PORT = 8080;
const SERVER_START_MESSAGE = `Сервер запущен на порту:`;
const PUBLIC_DIR = `public`;

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(`/`, homeRouter);
app.use(`/login`, loginRouter);
app.use(`/register`, registerRouter);
app.use(`/my`, myRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);

app.listen(WORK_PORT, () =>
  console.log(`${SERVER_START_MESSAGE} ${WORK_PORT}`));
