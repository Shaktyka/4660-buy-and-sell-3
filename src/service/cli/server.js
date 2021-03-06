'use strict';

const express = require(`express`);
const apiRouter = require(`./routes/api`);
const createError = require(`http-errors`);
const {ServerLogText, HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(`/api`, apiRouter);

app.use((req, res, next) => {
  next(createError(HttpCode.NOT_FOUND, `Not found`));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR);
  return res.json({
    status: err.status,
    message: err.message
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
