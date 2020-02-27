'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const MOCKS_FILE = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`
};

const app = express();
const router = express.Router();

app.use(express.json());
app.use(`/posts`, router);

router.use(`/`, (req, res) => {
  res.send(`/posts`);
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
