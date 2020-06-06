import { useDragLayer } from 'react-dnd'
import { CustomDragLayerContainer } from '../styles/styles'
import { Column } from './Column'
import React from 'react'

const CustomDragLayer: React.FC = (props) => {
  const { isDragging, item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging()
  }))

  return isDragging ? (
    <CustomDragLayerContainer>
      <Column
        id={item.id}
        text={item.text}
        index={item.index}
      />
    </CustomDragLayerContainer>
  ) : null
}