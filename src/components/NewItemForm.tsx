import React, { useState } from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { TextField, InputAdornment, Button, ButtonGroup } from '@material-ui/core'
import { NewItemFormContainer } from '../styles/styles'
import { useFocus } from '../utils'
interface NewItemFormProps {
  onAdd(text: string): void
  classes?: { input: string, root: string }
  closeShowForm: () => void
  type?: string
}

export const NewItemForm = (props: NewItemFormProps) => {
  const { onAdd, closeShowForm, type } = props
  const [text, setText] = useState("")
  const inputRef = useFocus()

  const inputProps = {
    startAdornment: (
      <InputAdornment position="start" style={{ color: '#df691a' }}>
        <ArrowRightIcon />
      </InputAdornment>
    ),
    autoFocus: true,
    placeholder: type ? 'List Title' : 'Task Title'
  }

  return (
    <NewItemFormContainer>
      <TextField
        id="new-item"
        style={{ marginTop: '10px', color: '#ffffff' }}
        autoComplete='off'
        type='text'
        size="small"
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        InputProps={inputProps}
      />
      <ButtonGroup variant="text" color='primary'>
        <Button style={{ marginTop: '10px', color: '#000000', textTransform: 'none' }} onClick={() => onAdd(text)}>Create</Button>
        <Button style={{ marginTop: '10px', color: '#df691a', textTransform: 'none' }} onClick={() => closeShowForm()}>Cancel</Button>
      </ButtonGroup>
    </NewItemFormContainer>
  )
}