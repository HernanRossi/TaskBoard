import React, { useRef, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { ColumnContainer, ColumnTitle } from '../styles/styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../context'
import { Card } from './Card'
import { useItemDrag } from '../utils/useItemDrag'
import { DragItem } from '../types/dragItem'
import { isHidden } from '../utils/isHidden'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface ColumnProps {
  text: string
  index: number
  id: string
  isPreview?: boolean
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {

  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag, preview } = useItemDrag({ type: "COLUMN", id, index, text })
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } })
      item.index = hoverIndex
    }
  })

  useEffect(() => {
    if (preview) preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  drag(drop(ref))

  return (
    <ColumnContainer ref={ref} isHidden={isHidden(state.draggedItem, "COLUMN", id, isPreview)} isPreview={isPreview}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} index={i} />
      ))}
      <AddNewItem toggleButtonText="+ Add another task"
        onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })}
        dark />
    </ColumnContainer>
  )
}