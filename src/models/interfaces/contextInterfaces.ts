import { DragItem } from "../types/dragItem"
import { ListInterface } from "./listInterface";

export interface AppState {
  lists: ListInterface[]
  draggedItem: DragItem | undefined
}
