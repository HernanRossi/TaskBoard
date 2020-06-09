import { TaskInterface } from "../interfaces/taskInterface";
export class Task implements TaskInterface {
  taskIndex: number = 0
  listIndex: number = 0
  taskId: string
  listId: string
  title: string
  type: 'Bug' | 'Feature' | 'Epic' | 'Story' | 'Task'
  typeLetter: string
  description?: string
  priority: number
  state: 'Closed' | 'Open' | 'In progress' | 'Created'
  created: Date
  updated?: Date
  assignee: string
  creator: string

  constructor(props: TaskInterface) {
    if (!props.listId || !props.title) throw new Error('Task must have listIndex and title.')
    this.listId = props.listId
    this.taskIndex = props.taskIndex
    this.listIndex = props.listIndex
    this.taskId = props.taskId
    this.title = props.title

    this.type = props.type || 'Task'
    this.typeLetter = props.type ? props.type[0] : 'T'
    this.description = props.description || ''
    this.priority = props.priority || 4
    this.state = 'Created'
    this.created = props.created || new Date()
    this.assignee = props.assignee || ''
    this.creator = props.creator || 'Admin'
  }

  toJson() {
    return {
      listId: this.listId,
      title: this.title,
      taskIndex: this.taskIndex,
      listIndex: this.listIndex,
      taskId: this.taskId,
      type: this.type,
      typeLetter: this.typeLetter,
      description: this.description,
      priority: this.priority,
      state: this.state,
      created: this.created,
      updated: this.updated,
      assignee: this.assignee,
      creator: this.creator,
    }
  }
}