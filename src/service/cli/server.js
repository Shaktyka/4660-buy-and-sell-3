'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE = `Not found`;
const MOCKS_FILE = `mocks.json`;

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`
};

const app = express();
const {Router} = require(`express`);
const router = new Router();

app.use(express.json());
app.use(`/posts`, router);

// Пробуем получить данные из файла
// const getMockData = async () => {
//   const fileContent = await fs.readFile(MOCKS_FILE);
//   return JSON.parse(fileContent);
// };

const checkFile = async (res) => {
  await fs.readFile(MOCKS_FILE, `utf8`)
    .then((data) => {
      console.log(JSON.parse(data));
    })
    .catch((err) => {
      if (err.code === `ENOENT`) {
        console.error(NOT_FOUND_MESSAGE);
      } else {
        console.error(err);
      }
      res.send([]);
    });

  // await fs.access(MOCKS_FILE)
  //   .then(() => isExists = true)
  //   .catch((err) => {
  //     console.error(`Ошибка 1`, err);
  //     isExists = false;
  //     res.send([]);
  //   });

  // if (isExists) {
  //   await fs.stat(MOCKS_FILE)
  //     .then((result) => {
  //       console.log(result.size);
  //       isNotEmpty = result.size > 0 ? true : false;
  //     })
  //     .catch((error) => {
  //       console.error(`Ошибка 2`, error);
  //       res.send([]);
  //     });
  // }
};

// const stream = fs.createReadStream('files/data.txt', 'utf8')
// stream.on('data', data => console.log(data))
// stream.on('error', err => console.log(`Err: ${err}`))

router.use(`/`, (req, res) => {
  checkFile(res);
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
