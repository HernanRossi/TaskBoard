import { ListInterface } from "../models/interfaces/listInterface"

export const findItemIndexById = (items: ListInterface[], id: string) => {
  return items.findIndex((item: ListInterface) => item.listId === id)
}