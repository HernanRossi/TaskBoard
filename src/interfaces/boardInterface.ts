import { ListInterface } from "./listInterface";

export interface BoardInterface {
  sessionId: string
  boardId: string
  title: string
  lists: Array<ListInterface>
}