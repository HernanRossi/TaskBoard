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

  if (!isDragging) {
    return null
  }

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === "LIST" ? (
          <List
            list={item.list}
            index={item.index}
            id={item.id}
            isPreview={isDragging ? true : false}
          />
        ) : (
            <StyledCard
              isPreview={true}
              task={item.task}
              index={0}
              id={item.id}
              listId={item.listId}
            />
          )}
      </div>
    </CustomDragLayerContainer>
  )
}

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
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