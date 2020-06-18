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
  sessionId: undefined,
  draggedItem: undefined,
}

const appStateReducer = (state: AppState, action: Action): AppState => {

  switch (action.type) {
    case "START_SESSION": {
      if (state.sessionId) return { ...state }
      const { session } = action.payload
      const { boards } = session
      const sessionBoard = new Board(boards[0])
      const {sessionId} = sessionBoard
      const newSession = _.cloneDeep(sessionBoard)
      const cachedReset = _.cloneDeep(newSession)
      return {
        sessionId,
        board: newSession, draggedItem: undefined,
        cachedReset
      }
    }
    case "RESET": {
      const reset = _.cloneDeep(state.cachedReset)
      localStorage.removeItem("state")
      return {
        cachedReset: _.cloneDeep(reset),
        board: reset, draggedItem: undefined,
        sessionId: reset.sessionId
      }
    }
    case "ADD_LIST": {
      if (action.payload.length < 1) return { ...state}
      return {
        ...state,
        board: {
          ...state.board,
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