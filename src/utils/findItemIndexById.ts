
interface Item {
  listId?: string
  taskId?: string
}

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  
  return items.findIndex((item: T) => item.listId === id || item.taskId === id)
}