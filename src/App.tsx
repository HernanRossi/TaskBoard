import React from 'react';
import './styles/App.css';
import { Card, Column, AddNewItem, CustomDragLayer } from './components'
import { AppContainer } from './styles/styles'
import { useAppState } from './context';

function App() {

  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="+Add another list"
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
    </AppContainer>
  );
}

export default App;
