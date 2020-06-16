import { DragItem } from "../../types/DragItem"
import { BoardInterface } from "./boardInterface";

export interface AppState {
  board: BoardInterface
  draggedItem: DragItem | undefined
}
