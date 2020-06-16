import { TaskInterface } from "../models/interfaces/taskInterface"
import { ListInterface } from "../models/interfaces/listInterface"

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