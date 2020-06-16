import { DragItem } from "./DragItem"

export type Action =
  |
  {
    type: "ADD_LIST"
    payload: string
  }
  |
  {
    type: "ADD_TASK"
    payload: { text: string, listId: string }
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
  |
  {
    type: "MOVE_TASK"
    payload: {
      dragIndex: number
      hoverIndex: number
      sourceList: string
      targetList: string
    }
  }
  |
  {
    type: "DELETE_TASK"
    payload: {
      id: string
      listId: string
    }
  }
  |
  {
    type: "DELETE_LIST"
    payload: {
      id: string
    }
  }
  |
  {
    type: "UPDATE_BOARD"
    payload: {
      title: string
    }
  }
  |
  {
    type: "RESET"
    payload: {}
  }