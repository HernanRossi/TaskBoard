import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import './styles/index.css'
import App from './App'
import { AppStateProvider } from './context/AppStateContext'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#df691a' },
    secondary: { main: '#ffffff' },
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
          borderBottom: `2px solid #df691a`,
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
      },

    },
  }
})
const  client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URL,
  })
})

const Entry = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <AppStateProvider>
            <App />
          </AppStateProvider>
        </DndProvider>
      </MuiThemeProvider >
    </ApolloProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Entry />, rootElement)

