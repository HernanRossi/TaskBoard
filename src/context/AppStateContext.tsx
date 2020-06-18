import React, { createContext, useReducer, useContext, useEffect } from "react"
import { nanoid } from "nanoid"
import _ from 'lodash'
import { findItemIndexById, moveItem } from "../utils"
import { AppState } from '../interfaces/contextInterfaces'
import { Action } from '../types/AppContextTypes'
import { defaultBoard } from "../models/mock-data/defaultBoard"
import { Task } from "../models/TaskClass"
import { Board } from "../models"

const appData: AppState = {
  cachedReset: _.cloneDeep(defaultBoard),
  board: _.cloneDeep(defaultBoard),
  sessionId: '',
  draggedItem: undefined,
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  const { sessionId, boardId, title } = state.board

  switch (action.type) {
    case "START_SESSION": {
      if(state.sessionId) return {...state}
      const { session } = action.payload
      const {boards} = session
      const sessionBoard = new Board(boards[0])
      return {
        sessionId,
        board: _.cloneDeep(sessionBoard), draggedItem: undefined,
        cachedReset: _.cloneDeep(sessionBoard)
      }
    }
    case "RESET": {
      const reset = _.cloneDeep(state.cachedReset)
      localStorage.removeItem("state")
      return {
        ...state,
        board: reset, draggedItem: undefined,
      }
    }
    case "ADD_LIST": {
      if (action.payload.length < 1) return { ...state, board: { lists: [...state.board.lists], sessionId, boardId, title } }
      return {
        ...state,
        board: {
          sessionId, boardId, title,
          lists: [...state.board.lists, { listId: nanoid(), title: action.payload, tasks: [] }]
        }
      }
    }
    case "ADD_TASK": {
      if (action.payload.text.length < 1) return { ...state }
      const targetLaneIndex = findItemIndexById(
        state.board.lists,
        action.payload.listId
      )
      state.board.lists[targetLaneIndex].tasks.push(
        new Task({
          listId: action.payload.listId,
          taskId: nanoid(),
          title: action.payload.text,
        }),
      )
      return {
        ...state
      }
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload
      state.board.lists = moveItem(state.board.lists, dragIndex, hoverIndex)
      return { ...state }
    }
    case "MOVE_TASK": {
      const {
        dragIndex,
        hoverIndex,
        sourceList,
        targetList
      } = action.payload
      const sourceLaneIndex = findItemIndexById(state.board.lists, sourceList)
      const targetLaneIndex = findItemIndexById(state.board.lists, targetList)
      const item = state.board.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
      state.board.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
      return { ...state }
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload }
    }
    case "DELETE_TASK": {
      const { id, listId } = action.payload
      const listIndex = findItemIndexById(state.board.lists, listId)
      const taskIndex = findItemIndexById(state.board.lists[listIndex].tasks, id)
      state.board.lists[listIndex].tasks.splice(taskIndex, 1)
      return { ...state }
    }
    case "DELETE_LIST": {
      const { id } = action.payload
      const listIndex = findItemIndexById(state.board.lists, id)
      state.board.lists.splice(listIndex, 1)
      return { ...state }
    }
    case "UPDATE_BOARD": {
      const { title } = action.payload
      state.board.title = title
      return { ...state }
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
  const persistedState = localStorage.getItem("state")
  let localState = appData
  if (persistedState) {
    localState = JSON.parse(persistedState)
  }

  const [state, dispatch] = useReducer(appStateReducer, localState)

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }} >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}