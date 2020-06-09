export interface Task {
  columnId: string
  columnIndex: number
  title: string
  type: string
  typeLetter: string
  description: string
  priority: number
  state: ['Closed', 'Open', 'In progress', 'Created' ]
  created: Date
  updated: Date
  assignee: string
  creator: string
}