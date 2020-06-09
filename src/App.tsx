import React from 'react';
import './styles/App.css';
import { Column, AddNewItem, CustomDragLayer, PermanentDrawerLeft } from './components'
import { AppContainer } from './styles/styles'
import { useAppState } from './context';

function App() {

  const { state, dispatch } = useAppState()

  return (
    <PermanentDrawerLeft>
      <AppContainer>
        <CustomDragLayer />
        {state.lists.map((list, i) => (
          <Column id={list.id} text={list.text} key={list.id} index={i} />
        ))}
        <AddNewItem
          toggleButtonText="New List"
          type='column'
          onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
      </AppContainer>
    </PermanentDrawerLeft>
  );
}

export default App;
