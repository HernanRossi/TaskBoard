export type ListDragItem = {
  listIndex: number
  listId: string
  type: "LIST"
}

export type CardDragItem = {
  taskIndex: number
  taskId: string
  listId: string
  type: "CARD"
}

export type DragItem = ListDragItem | CardDragItem