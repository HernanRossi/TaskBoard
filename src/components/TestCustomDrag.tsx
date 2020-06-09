import { DragLayerMonitor, DragLayer } from "react-dnd";
import React from 'react';

let dragLayerRef: HTMLElement

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

const dragLayerCollector = (monitor: DragLayerMonitor) => {
  if (dragLayerRef) {
    const offset = monitor.getSourceClientOffset() || monitor.getInitialClientOffset();

    if (offset) {
      dragLayerRef.style["transform"] = `translate(${offset.x}px, ${offset.y}px)`;
    } else {
      dragLayerRef.style["display"] = `none`;
    }
  }

  return {
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
  };
};

export default DragLayer(dragLayerCollector)(
  (props): JSX.Element => {
    // if (!props.isDragging) {
    //   return <div/>
    // }
		
    return (
      <div style={layerStyles}>
        {/* <div ref={ (ref) => dragLayerRef = ref }>test</div> */}
      </div>
    )
  }
)