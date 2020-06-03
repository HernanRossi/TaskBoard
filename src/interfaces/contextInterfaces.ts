import { DragItem } from "../types/dragItem"

interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[]
  draggedItem: DragItem | undefined
}
