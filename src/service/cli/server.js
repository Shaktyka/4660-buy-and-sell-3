'use strict';

const express = require(`express`);

const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);
const offersRouter = require(`./routes/offers`);
// const formidableMiddleware = require(`express-formidable`);

const DEFAULT_PORT = 3000;

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(formidableMiddleware({
//   encoding: `utf-8`,
//   uploadDir: `./tmp`,
//   multiples: false,
// }));

app.use(`/offers`, offersRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/search`, searchRouter);

app.use((req, res) => {
  res.status(404).send(`404: страница не найдена`);
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(`500: на сервере что-то пошло не так...`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args, 10) || DEFAULT_PORT;
    app.listen(port, (err) => {
      if (err) {
        return console.error(ServerLogText.ERROR, err);
      }
      return console.log(`${ServerLogText.CONNECT} ${port}`);
    });
  }
};
