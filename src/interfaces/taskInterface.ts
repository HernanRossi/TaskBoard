export interface TaskInterface {
  listId: string // Innique identifier for the list the task is assigned to
  taskId: string // Unique identifier for the task
  taskIndex?: number
  title: string
  type?: 'Bug' | 'Feature' | 'Epic' | 'Story' | 'Task'
  typeLetter?: string
  description?: string
  priority?: number
  state?: 'Closed' | 'Open' | 'In progress' | 'Created'
  created?: Date | string
  updated?: Date | string
  assignee?: string
  creator?: string
}