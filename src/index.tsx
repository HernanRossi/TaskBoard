import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './styles/index.css'
import App from './App'
import { AppStateProvider } from './context/AppStateContext'

const Entry = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Entry />, rootElement)

