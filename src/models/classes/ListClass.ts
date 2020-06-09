import { ListInterface } from "../interfaces/listInterface";
import { TaskInterface } from "../interfaces/taskInterface";
export class List implements ListInterface {
  title: string
  listIndex?: number
  listId: string
  tasks: Array<TaskInterface>

  constructor(props: ListInterface) {
    if (!props.listId) throw new Error('List must have listId.')
    this.listId = props.listId
    this.listIndex = props.listIndex
    this.tasks = props.tasks
    this.title = props.title
  }
}