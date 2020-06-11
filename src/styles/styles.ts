import styled from 'styled-components'
export const AppContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #fffff;
  flex-direction: row;
  height: 100%;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`

interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${props => (props.isPreview ? "rotate(5deg)" : undefined)};
  opacity: ${props => (props.isHidden ? 0 : 1)};
`

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #FFFFFF;
  width: 300px;
  min-height:300px;
  margin-right: 20px;
  border-radius: 10px;
  padding: 5px 5px;
  flex-grow: 0;
  flex-shrink: 0;
  border: 0.2px solid rgba(122, 115, 111,0.4);
`

export const ColumnTitle = styled.div`
  padding: 6px 12px 2px;
  font-weight: 400;
  font-size: 19px;
  text-align: center;
`

export const CardContainer = styled(DragPreviewContainer)`
  background-color: #FFFFFF;
  cursor: pointer;
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  max-width: 300px;
  border-radius: 5px;
`
export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`
export const DrawerFooter = styled.span`
  position: absolute;
  bottom: 0;
  padding: 6px 12px 2px;
  font-weight: 400;
  font-size: 10px;
  text-align: center;
  color: #df691a;  
`

export const DividerLine = styled.hr`
  display: block;
  position: relative;
  padding: 0;
  margin: 3px auto;
  height: 0;
  width: 90%;
  max-height: 0;
  font-size: 1px;
  line-height: 0;
  clear: both;
  border: none;
  border-bottom: 1px solid #df691a;
  margin-bottom: 20px;
  margin-top: 0px;
`