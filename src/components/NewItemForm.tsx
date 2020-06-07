import React, { useState } from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { TextField, InputAdornment } from '@material-ui/core'

import { NewItemFormContainer, NewItemButton, NewItemInput } from '../styles/styles'
import { useFocus } from '../utils'
interface NewItemFormProps {
  onAdd(text: string): void
}

export const NewItemForm = (props: NewItemFormProps) => {
  const { onAdd } = props
  const [text, setText] = useState("")
  const inputRef = useFocus()

  return (
    <NewItemFormContainer>
      <TextField
        id="new-item"
        label="Add New Item"
        variant="filled"
        color="secondary"
        size="small"
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onSubmit={() => onAdd(text)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ArrowRightIcon />
            </InputAdornment>
          ),
        }}
      />
      <NewItemButton onClick={() => onAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  )
}