import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { CardContainer } from '../styles/styles'
import { CardDragItem } from '../types/dragItem'
import { useAppState } from '../context'
import { useItemDrag } from '../utils/useItemDrag'


interface CardProps {
  text: string
  id: string
  index: number
  columnId: string
}

export const Card = ({ text, id, index, columnId }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { dispatch } = useAppState()
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
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId })


  drag(drop(ref))
  return <CardContainer>{text}</CardContainer>
}