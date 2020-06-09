import React, { createContext, useReducer, useContext } from "react"
import { v4 as uuid } from 'uuid'
import { findItemIndexById, moveItem } from "../utils"
import { AppState } from '../models/interfaces/contextInterfaces'
import { Action } from '../models/types/appContextTypes'
import { defaultLists } from "../models/mock-data/defaultTasks"
import { Task } from "../models/classes/TaskClass"

const appData: AppState = {
  lists: defaultLists,
  draggedItem: undefined,
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      if (action.payload.length < 1) return { ...state, lists: [...state.lists] }
      return {
        ...state,
        lists: [
          ...state.lists,
          { listId: uuid(), title: action.payload, tasks: [] }
        ]
      }
    }
    case "ADD_TASK": {
      if (action.payload.text.length < 1) return { ...state }
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )
      state.lists[targetLaneIndex].tasks.push(
        new Task({
          listId: action.payload.listId,
          taskIndex: state.lists[targetLaneIndex].tasks.length,
          taskId: uuid(),
          title: action.payload.text,
        }),
      )
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
        sourceListId,
        targetListId
      } = action.payload
      const sourceLaneIndex = findItemIndexById(state.lists, sourceListId)
      const targetLaneIndex = findItemIndexById(state.lists, targetListId)
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