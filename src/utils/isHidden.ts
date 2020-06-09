import { DragItem, CardDragItem, ListDragItem } from "../models/types/dragItem"

export const isHidden = (
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string,
  isPreview: boolean | undefined
): boolean => {
  let checkId = ''
  if(draggedItem?.type === "CARD") {
    const card = <CardDragItem>draggedItem
    checkId = card.taskId
  } else if(draggedItem?.type === "LIST") {
    const list = <ListDragItem>draggedItem
    checkId = list.listId
  }
  return Boolean(
    !isPreview 
    && draggedItem 
    && (draggedItem?.type === itemType) 
    && (checkId === id)
  )
}