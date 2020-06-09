import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { ColumnContainer, ColumnTitle, DividerLine } from '../styles/styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../context'
import { useItemDrag } from '../utils/useItemDrag'
import { DragItem } from '../models/types/dragItem'
import { isHidden } from '../utils/isHidden'
import { StyledCard } from './StyledCard'

interface ListProps {
  title: string
  listIndex: number
  listId: string
  isPreview?: boolean
}

export const List = ({ title, listIndex, listId, isPreview }: ListProps) => {

  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({ type: "LIST", listId, listIndex })
  const [, drop] = useDrop({
    accept: ["LIST", "CARD"],
    hover(item: DragItem) {
      if (item.type === "LIST") {
        const dragIndex = item.listIndex
        const hoverIndex = listIndex

        if (dragIndex === hoverIndex) return

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } })
        item.listIndex = hoverIndex
      } else {
        const dragIndex = item.taskIndex
        const hoverIndex = 0
        const sourceListId = item.listId
        const targetListId = listId

        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, hoverIndex, sourceListId, targetListId }
        })
        item.taskIndex = hoverIndex
        item.listId = targetListId
      }
    }
  })

  drag(drop(ref))

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, "LIST", listId, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{title}</ColumnTitle>
      <DividerLine />
      {state.lists[listIndex].tasks.map((task, i) => (
        <StyledCard 
        task={task} 
        onDelete={() => console.log('Delete task.')} 
        taskHoverIndex={i}
        isPreview={isPreview}
        listHoverId={listId} />
      ))}
      <AddNewItem toggleButtonText="New Task"
        onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, listId } })}
        dark />
    </ColumnContainer>
  )
}