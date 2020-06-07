import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { CardContainer } from '../styles/styles'
import { CardDragItem } from '../types/dragItem'
import { useAppState } from '../context'
import { useItemDrag } from '../utils/useItemDrag'
import { isHidden } from '../utils/isHidden'


interface CardProps {
  text: string
  id: string
  index: number
  columnId: string
  isPreview?: boolean
}

export const Card = ({ text, id, index, columnId, isPreview }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useAppState()
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      if (item.id === id) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      const sourceColumn = item.columnId
      const targetColumn = columnId

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
      })
      item.index = hoverIndex
      item.columnId = targetColumn
    }
  })

  drag(drop(ref))
  return <CardContainer
    isHidden={isHidden(state.draggedItem, "CARD", id, isPreview)}
    isPreview={isPreview}
    ref={ref}
  >
    {text}
  </CardContainer>
}