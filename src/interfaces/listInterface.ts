import { TaskInterface } from "./taskInterface";

export interface ListInterface {
  title: string
  listIndex?: number
  listId: string
  tasks: Array<TaskInterface>
}