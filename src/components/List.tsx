import React, { useRef } from 'react'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import { makeStyles } from '@material-ui/core/styles';
import { ColumnContainer, ColumnTitle, DividerLine } from '../styles/styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../context'
import { useItemDrag } from '../utils/useItemDrag'
import { DragItem } from '../models/types/DragItem'
import { isHidden } from '../utils/isHidden'
import { StyledCard } from './StyledCard'
import { ListInterface } from '../models/interfaces/listInterface'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    height: '3px',
    transition: "0.4s",
    "&:hover": {
      boxShadow: "0 0 60px 100px rgba(223,105,26,0.1) inset"
    }
  },
}))

interface ListProps {
  list: ListInterface
  id: string
  index: number
  isPreview?: boolean
}

export const List = ({ list, id, index, isPreview }: ListProps) => {
  const classes = useStyles()
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
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)

          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (!event?.currentTarget) return
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = () => {
    dispatch({
      type: "DELETE_LIST",
      payload: { id }
    })
    setAnchorEl(null);
  }

  const handleEdit = () => {
    setAnchorEl(null);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, "LIST", id, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>
        {title}

      </ColumnTitle>
      < IconButton className={classes.iconButton} style={{ left: '41%', marginTop: '-20px', marginBottom: '-10px', color: '#df691a', paddingTop: '-20px' }} aria-controls="settings" onClick={(e) => handleClick(e)} aria-haspopup="true">
        <MoreHorizIcon />
      </IconButton>
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
      <Menu
        id="settings"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </ColumnContainer>
  )
}