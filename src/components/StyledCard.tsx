
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TaskInterface } from '../models/interfaces/taskInterface';
import { useAppState } from '../context';
import { useItemDrag } from '../utils/useItemDrag';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { DragItem } from '../types/DragItem';
import { CardContainer } from '../styles/styles';
import { isHidden } from '../utils/isHidden';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem, TextField } from '@material-ui/core';

const inputProps = {
  placeholder: 'Add description'
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    border: "1px solid rgb(223,105,26, 0.3)",
    transition: "0.2s",
    boxShadow: "2px 8px 15px -11px rgba(223,105,26,0.5)",
    "&:hover": {
      boxShadow: "0 15px 55px -16.125px rgba(223,105,26,0.2)"
    }
  },
  avatar: {
    border: "2px solid white",
    backgroundColor: '#485563',
  },
  iconButton: {
    width: '3px',
  },
}));

type CardProps = {
  task: TaskInterface
  index: number
  id: string
  listId: string
  isPreview?: boolean
}

export const StyledCard = React.memo(({ task, index, id, listId, isPreview }: CardProps) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useAppState()
  const [text, setText] = useState("")

  const { drag } = useItemDrag({ type: "CARD", task, id, index, listId })
  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (item.type === "CARD") {
        if (item.id === id) return
        const dragIndex = item.index
        const hoverIndex = index
        const sourceList = item.listId
        const targetList = listId
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const clientOffset = monitor.getClientOffset()
        if (hoverBoundingRect && clientOffset) {
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4
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

  drag(drop(ref))

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (!event?.currentTarget) return
    setAnchorEl(event.currentTarget);
  }

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: { id, listId }
    })
    setAnchorEl(null);
  }

  // const handleEdit = () => {
  //   console.log('Edit')
  //   setAnchorEl(null);
  // }
  const handleClose = () => {
    console.log('Close')
    setAnchorEl(null);
  }

  const updateDesc = (text: string) => {
    setText(text)
    task.description = text
  }

  return (
    <CardContainer
      isHidden={isHidden(state.draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      <Card className={classes.root}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="task" className={classes.avatar}>
              {task.typeLetter}
            </Avatar>
          }
          action={
            < IconButton className={classes.iconButton} aria-controls="settings" onClick={(e) => handleClick(e)} aria-haspopup="true">
              <MoreVertIcon />
            </IconButton>
          }
          title={task.title}
          subheader={`Created: ${new Date(task.created || '').toLocaleDateString("en-US")}`}
        />
        <CardContent>
          <Menu
            id="settings"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>

          <TextField
            id="new-item"
            style={{ marginTop: '10px', color: '#ffffff' }}
            autoComplete='off'
            type='text'
            size="small"
            multiline
            value={task.description}
            onChange={e => updateDesc(e.target.value)}
            InputProps={inputProps}
          />
        </CardContent>
      </Card>
    </CardContainer>
  )
})
