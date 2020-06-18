import { TaskInterface } from "../interfaces/taskInterface"
import { ListInterface } from "../interfaces/listInterface"

export type ListDragItem = {
  list: ListInterface
  index: number
  id: string
  type: "LIST"
}

export type CardDragItem = {
  task: TaskInterface
  index: number
  id: string
  listId: string
  type: "CARD"
}

export type DragItem = ListDragItem | CardDragItem