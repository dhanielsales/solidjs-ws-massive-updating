const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

const itemsNumber = 10000
const items = Array.from(Array(itemsNumber), (_, x) => x).map((id) => ({ id: id + 1, value: 0, status: "blue" }));

wss.on('connection', async (ws) => {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send(Buffer.from(JSON.stringify({ type: "start", data: items })));

  await updateRandow(ws)
});

function getRandom(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(0));
}

async function updateRandow(ws) {
  setInterval(async () => {
    const updateCount = getRandom(1, itemsNumber / 2)

    const update = Array.from({ length: updateCount }).map(async (_, index) => {
      const value = getRandom(1, 100)
      const id = getRandom(1, itemsNumber)
      const data = {
        id: id,
        value: value,
        status: value > 80
          ? "red" : value > 60
            ? "orange" : value > 30
              ? "green"
              : "blue"
      }

      ws.send(Buffer.from(JSON.stringify({ type: "update", data })));
      return
    })

    await Promise.all(update)
  }, 1000)
}
