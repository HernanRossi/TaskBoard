import React from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import { CustomDragLayerContainer } from '../styles/styles'
import { Column } from './Column'
import { Card } from './Card'

export const CustomDragLayer: React.FC = (props) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }))

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset, isDragging)}>
        {item.type === "COLUMN" ? (
          <Column
            id={item.id}
            text={item.text}
            index={item.index}
            isPreview={isDragging ? true : false}
          />
        ) : (
            <Card
              columnId={item.columnId}
              isPreview={true}
              index={0}
              id={item.id}
              text={item.text}
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