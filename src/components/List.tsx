import React, { useRef } from 'react'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import { ColumnContainer, ColumnTitle, DividerLine } from '../styles/styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../context'
import { useItemDrag } from '../utils/useItemDrag'
import { DragItem } from '../models/types/DragItem'
import { isHidden } from '../utils/isHidden'
import { StyledCard } from './StyledCard'
import { ListInterface } from '../models/interfaces/listInterface'

interface ListProps {
  list: ListInterface
  id: string
  index: number
  isPreview?: boolean
}

export const List = ({ list, id, index, isPreview }: ListProps) => {
  const { title } = list
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ["LIST", "CARD"],
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (item.type === "LIST") {
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) return

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } })
        item.index = hoverIndex
      } else {
        const dragIndex = item.index
        const hoverIndex = 0
        const sourceList = item.listId
        const targetList = id
        if (sourceList === targetList) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()
        if (hoverBoundingRect && clientOffset) {
          // Get vertical middle
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position


          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
        }


        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, hoverIndex, sourceList, targetList }
        })
        item.index = hoverIndex
        item.listId = targetList
      }
    }
  })

  const { drag } = useItemDrag({ type: "LIST", list, id, index })

  drag(drop(ref))

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, "LIST", id, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{title}</ColumnTitle>
      <DividerLine />
      {state.lists[index].tasks.map((task, i) => (
        <StyledCard
          id={task.taskId}
          key={task.taskId}
          task={task}
          listId={id}
          index={i} />
      ))}
      <AddNewItem toggleButtonText="New Task"
        onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, listId: id } })}
        dark />
    </ColumnContainer>
  )
}