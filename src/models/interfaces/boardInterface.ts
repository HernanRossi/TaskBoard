import { ListInterface } from "./listInterface";

export interface BoardInterface {
  userId: string
  boardId: string
  title: string
  lists: Array<ListInterface>
}