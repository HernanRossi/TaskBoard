import { DragItem } from "../types/DragItem"
import { ListInterface } from "./listInterface";

export interface AppState {
  lists: ListInterface[]
  draggedItem: DragItem | undefined
}
