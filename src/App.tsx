import React from 'react';
import './styles/App.css';
import { List, AddNewItem, CustomDragLayer, PermanentDrawerLeft } from './components'
import { AppContainer } from './styles/styles'
import { useAppState } from './context';

function App() {

  const { state, dispatch } = useAppState()

  return (
    <PermanentDrawerLeft>
      <AppContainer>
        <CustomDragLayer />
        {state.lists.map((list, i) => (
          <List listId={list.listId} title={list.title} key={list.listId} listIndex={i} />
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
