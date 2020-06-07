import { useDrag } from 'react-dnd'
import { useAppState } from '../context'
import { DragItem } from "../types/dragItem"
import { useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState()
  const [, drag, preview] = useDrag({
    item,
    begin: () => dispatch({
      type: "SET_DRAGGED_ITEM",
      payload: item
    }),
    end: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: undefined })
  })
  
  useEffect(() => {
    if (preview) preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])
  
  return { drag, preview }
}