const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

server.get('/', async (_, response) => {
  const delay = getRandom(50, 300)
  const result = getRandom(1, 100)
  const status = result > 80
    ? "red" : result > 60
      ? "orange" : result > 30
        ? "green"
        : "blue";

  await new Promise(resolve => setTimeout(() => resolve(), delay))

  return response.status(200).json({
    value: Number(result.toFixed(0)),
    status
  })
});

server.listen(3001, () => console.log('Server listen at port 3001'));
