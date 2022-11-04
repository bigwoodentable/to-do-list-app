import { IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

function DeleteTaskButton({ handleDelGroup }) {
  return (
    <IconButton onClick={handleDelGroup}>
      <DeleteIcon />
      <Typography>Delete Tasks</Typography>
    </IconButton>
  )
}

export default DeleteTaskButton
