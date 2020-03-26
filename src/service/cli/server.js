'use strict';

const express = require(`express`);
const apiRouter = require(`./routes/api`);
const createError = require(`http-errors`);
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

app.use(`/api`, apiRouter);

// Обработчики ошибок
app.use((req, res, next) => {
  next(createError(404, `Not found`));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
    stack: err.stack
  });
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
