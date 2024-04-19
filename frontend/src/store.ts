import { createStore } from "solid-js/store";

export type Store = {
  id: number
  value: number
  status: string
}

export const [items, setItems] = createStore<Store[]>([]);
