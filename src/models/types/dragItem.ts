import { TaskInterface } from "../interfaces/taskInterface"

export type ListDragItem = {
  listIndex: number
  listId: string
  type: "LIST"
}

export type CardDragItem = {
  task: TaskInterface
  taskIndex: number
  listIndex: number
  listId: string
  taskId: string
  type: "CARD"
}

export type DragItem = ListDragItem | CardDragItem