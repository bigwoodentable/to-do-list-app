import { IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

function DeleteTaskButton({ handleDelGroup }) {
  return (
    <IconButton style={{ color: 'grey' }} onClick={handleDelGroup}>
      <DeleteIcon />
      <Typography style={{ color: 'grey' }} variant="h6">
        Delete Tasks
      </Typography>
    </IconButton>
  )
}

export default DeleteTaskButton
