import React from 'react'
import './styles/App.css'
import { List, AddNewItem, CustomDragLayer, PermanentDrawerLeft } from './components'
import { AppContainer } from './styles/styles'
import { useAppState } from './context'

function App() {

  const { state, dispatch } = useAppState()

  return (
    <PermanentDrawerLeft>
      <AppContainer>
        <CustomDragLayer />
        {state.board.lists.map((list, i) => (
          <List list={list} key={list.listId} id={list.listId} index={i} />
        ))}
        <AddNewItem
          toggleButtonText="New List"
          type='list'
          onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
      </AppContainer>
    </PermanentDrawerLeft>
  );
}

export default App;
