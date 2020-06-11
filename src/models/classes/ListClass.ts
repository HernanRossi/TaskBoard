import { ListInterface } from "../interfaces/listInterface";
import { TaskInterface } from "../interfaces/taskInterface";
export class List implements ListInterface {
  title: string
  listId: string
  tasks: Array<TaskInterface>

  constructor(props: ListInterface) {
    if (!props.listId) throw new Error('List must have listId.')
    this.listId = props.listId
    this.tasks = props.tasks
    this.title = props.title
  }
}