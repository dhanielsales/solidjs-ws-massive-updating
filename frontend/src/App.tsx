import { Show, For } from "solid-js";

import "./ws"
import { items } from './store'

export default function App() {
  return (
    <div class="flex w-full flex-wrap gap-1 p-1">
      <For each={items}>
        {(item) => <Item id={item.id} />}
      </For>
  </div>
  )
}

type Props = {
  id: number
}

function Item({ id }: Props) {
  const item = items[id]

  return (
    <Show when={!!item}>
      <div 
        style={{background: item.status }} 
        class="text-white font-bold w-8 h-8 flex items-center justify-center">
          {item.value}
      </div>
    </Show>
  )
}

