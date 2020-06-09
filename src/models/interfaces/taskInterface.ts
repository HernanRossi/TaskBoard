export interface TaskInterface {
  listId: string // Innique identifier for the list the task is assigned to
  listIndex: number // The index of the currently assigned list for the task
  taskIndex: number // The index of the task within the assigned list
  taskId: string // Unique identifier for the task
  title: string
  type?: 'Bug' | 'Feature' | 'Epic' | 'Story' | 'Task'
  typeLetter?: string
  description?: string
  priority?: number
  state?: 'Closed' | 'Open' | 'In progress' | 'Created'
  created?: Date
  updated?: Date
  assignee?: string
  creator?: string
}