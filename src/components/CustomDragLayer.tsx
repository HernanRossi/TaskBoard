import React from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import { CustomDragLayerContainer } from '../styles/styles'
import { List } from './List'
import { StyledCard } from './StyledCard'

export const CustomDragLayer: React.FC = (props) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }))

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset, isDragging)}>
        {item.type === "LIST" ? (
          <List
            listId={item.listId}
            title={item.title}
            listIndex={item.listIndex}
            isPreview={isDragging ? true : false}
          />
        ) : (
            <StyledCard
              isPreview={true}
              taskHoverIndex={0}
              task={item.task}
              listHoverId={item.listHoverId}
              
            />
          )}
      </div>
    </CustomDragLayerContainer>
  ) : null
}

function getItemStyles(currentOffset: XYCoord | null, isDragging: boolean): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none"
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}