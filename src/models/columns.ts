import { Task } from "./task";

export interface Column {
  title: string
  columnId: string
  tasks: Array<Task>
}