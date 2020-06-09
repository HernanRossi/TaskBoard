import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './styles/index.css'
import App from './App'
import { AppStateProvider } from './context/AppStateContext'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#df691a'},
    secondary: { main: '#ffffff'},
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:before': { // underline color when textfield is inactive
          borderBottomColor: '#697785',
          backgroundColor: '#697785',
          height: '1px',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid #FFFFFF`,
        },
        '&:hover:not($disabled):after': { // underline color when hovered
          borderBottomColor: '#df691a',
          backgroundColor: '#df691a',
          height: '1px',
        },
        '&:after': {
          borderBottomColor: '#df691a',
          backgroundColor: '#df691a',
          height: '1px',
        },
        disabled: {
        },
      },
      focused: {
        '&:before': { // underline color when textfield is inactive
          borderBottomColor: '#df691a',
          height: '1px',
        },
        '&:hover:not($disabled):before': { // underline color when hovered
          borderBottomColor: '#df691a', height: '1px',
        },
        '&:after': {
          borderBottomColor: '#df691a', height: '1px',
        },
      },
    },
  }
})

const Entry = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </DndProvider>
    </MuiThemeProvider >
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Entry />, rootElement)

