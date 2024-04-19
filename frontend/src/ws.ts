import { createReconnectingWS } from "@solid-primitives/websocket";

import { setItems, Store } from './store'

const ws = createReconnectingWS("ws://localhost:8080");

type StartData = {
  type: "start";
  data: Store[];
}

type UpdateData = {
  type: "update";
  data: Store;
}

type Data = StartData | UpdateData

ws.addEventListener("message", async (ev) => {
  const dataString = await ev.data.text()
  const data: Data = JSON.parse(dataString)

  if (data.type === "start") {
    handleStartMessage(ev, data)
    return
  }

  if (data.type === "update") {
    handleUpdateMessage(ev, data)
    return
  }
});

async function handleStartMessage(ev: MessageEvent, data: StartData) {
  setItems(data.data)
}

async function handleUpdateMessage(ev: MessageEvent, data: UpdateData) {
  setItems(data.data.id, data.data)
}
