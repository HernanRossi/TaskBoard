import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { NewItemForm } from './NewItemForm'
import { Button } from '@material-ui/core'

interface AddNewItemProps {
  onAdd(text: string): void
  toggleButtonText: string
  dark?: boolean
  type?: string

}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false)
  const { onAdd, toggleButtonText, dark, type } = props

  function closeShowForm() {
    setShowForm(false)
  }
  if (showForm) {
    return (
      <NewItemForm
        onAdd={text => {
          onAdd(text)
          setShowForm(false)
        }}
        closeShowForm={closeShowForm}
        type={type}
      />
    )
  }

  function getStyle() {
    if (type === 'column') {
      return { color: '#df691a', fontSize:'15px' }
    }
    return { color: '#df691a', fontSize:'13px' }
  }

  return (
    <Button color="primary" onClick={() => setShowForm(true)} style={getStyle()}><AddIcon style={{ fontSize: 'medium' }} />{toggleButtonText}</Button>
  )
}