import { DragItem } from "./dragItem"

export type Action =
|
{
  type: "ADD_LIST"
  payload: string
}
|
{
  type: "ADD_TASK"
  payload: { text: string, taskId: string }
}
|
{
  type: "MOVE_LIST"
  payload: {
    dragIndex: number
    hoverIndex: number
  }
}
|
{
  type: "SET_DRAGGED_ITEM"
  payload: DragItem | undefined
}
|
{
  type: "MOVE_LIST"
  payload: {
    dragIndex: number
    hoverIndex: number
  }
}