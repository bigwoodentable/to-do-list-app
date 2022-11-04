import { IconButton } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'

function CompleteTaskButton({ handleCompleted }) {
  return (
    <IconButton onClick={handleCompleted}>
      <CheckIcon />
    </IconButton>
  )
}

export default CompleteTaskButton
