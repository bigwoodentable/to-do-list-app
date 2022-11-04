import { IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

function DeleteListButton({ handleDeleteList }) {
  return (
    <IconButton onClick={handleDeleteList}>
      <DeleteSweepIcon />
      <Typography>Delete List</Typography>
    </IconButton>
  )
}

export default DeleteListButton
