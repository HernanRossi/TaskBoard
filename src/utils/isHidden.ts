import { DragItem } from "../types/dragItem"

export const isHidden = (
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean => {
  return Boolean(
    (draggedItem?.type === itemType) && (draggedItem.id === id)
  )
}