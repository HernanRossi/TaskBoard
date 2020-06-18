import React, { useEffect, useState } from 'react'
import './styles/App.css'
import { List, AddNewItem, CustomDragLayer, PermanentDrawerLeft } from './components'
import { AppContainer, LogoLoading } from './styles/styles'
import { useAppState } from './context'
import { nanoid } from 'nanoid'
import { Session } from './interfaces/contextInterfaces'
import { StartSession } from './graphql/mutations'
import { useMutation } from '@apollo/client'
import { Typography } from '@material-ui/core'

function App() {
  const { state, dispatch } = useAppState()
  const [loading, setLoading] = useState(true)
  const [startSession] = useMutation(StartSession)

  useEffect(() => {
    setLoading(true)
    async function launch() {
      const sessionId = nanoid()
      const { data } = await startSession({ variables: { sessionId } })
      if (!data || !data.defaultSession) return
      const session = data.defaultSession as Session
      dispatch({
        type: "START_SESSION",
        payload: { session }
      })
      setLoading(false)
    }
    launch()
  }, []);

  const isLoading = () => {
    if (loading) {
      return (
        <div style={{ margin: 'auto', marginTop: '125px' }}>
          <LogoLoading />
          <Typography style={{ margin: 'auto' }}>We are loading the data one second please :)</Typography>
        </div>
      )
    }
    return (<AppContainer>
      <CustomDragLayer />
      {state.board.lists.map((list, i) => (
        <List list={list} key={list.listId} id={list.listId} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="New List"
        type='list'
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
    </AppContainer>)
  }
  return (
    <PermanentDrawerLeft>
      {isLoading()}
    </PermanentDrawerLeft>
  );
}

export default App;
