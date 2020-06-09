
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TaskInterface } from '../models/interfaces/taskInterface';
import { useAppState } from '../context';
import { useItemDrag } from '../utils/useItemDrag';
import { useDrop } from 'react-dnd';
import { CardDragItem } from '../models/types/dragItem';
import { CardContainer } from '../styles/styles';
import { isHidden } from '../utils/isHidden';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#df691a',
  },
}));

type CardProps = {
  task: TaskInterface
  taskHoverIndex: number
  listHoverId: string
  onDelete?: () => void
  isPreview?: boolean
}

export const StyledCard = ({ task, isPreview, onDelete, taskHoverIndex, listHoverId }: CardProps) => {
  const { taskId, listId, taskIndex, title } = task
  const classes = useStyles();
   const ref = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useAppState()
  const { drag } = useItemDrag({ type: "CARD", taskId, taskIndex, listId })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      if (item.taskId === taskId) {
        return
      }
      const dragIndex = item.taskIndex
      const hoverIndex = taskIndex
      const sourceListId = item.listId
      const targetListId = listHoverId

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceListId, targetListId }
      })
      item.taskIndex = hoverIndex
      item.listId = targetListId
    }
  })

  drag(drop(ref))

  return (
    <CardContainer
      isHidden={isHidden(state.draggedItem, "CARD", taskId, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="task" className={classes.avatar}>
              {task.typeLetter}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={task.title}
          subheader={`Created: ${task.created?.toLocaleDateString("en-US")}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {task.description}
          </Typography>
        </CardContent>
      </Card>
    </CardContainer>
  )
}
