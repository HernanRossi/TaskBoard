import React, { createContext, useReducer, useContext } from "react"
import { v4 as uuid } from 'uuid'
import { findItemIndexById, moveItem } from "../utils"
import { AppState } from '../interfaces/contextInterfaces'
import { Action } from '../types/appContextTypes'

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Click on a List and move it around." }, { id: "c1", text: "Click on a Task and move it around." }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "This app is created using TypeScript and React." }]
    },
    {
      id: "2",
      text: "Review",
      tasks: [{ id: "c3", text: "Try adding a new Task." }, { id: "c4", text: "Try adding a new List." }]
    },
    {
      id: "3",
      text: "Done",
      tasks: [{ id: "c5", text: "Try to Delete a Task" }, { id: "c6", text: "Try to Delete a column" }]
    }
  ],
  draggedItem: undefined
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      if (action.payload.length < 1) return { ...state, lists: [...state.lists] }
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuid(), text: action.payload, tasks: [] }
        ]
      }
    }
    case "ADD_TASK": {
      if (action.payload.text.length < 1) return { ...state }
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.taskId
      )
      state.lists[targetLaneIndex].tasks.push({
        id: uuid(),
        text: action.payload.text
      })
      return {
        ...state
      }
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return { ...state }
    }
    case "MOVE_TASK": {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn
      } = action.payload
      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn)
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
      return { ...state }
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload }
    }
    default: {
      return state
    }
  }
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)
  return (
    <AppStateContext.Provider value={{ state, dispatch }} >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}