import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

function AddTaskButton({ handleClickOpen }) {
  return (
    //Button-format
    <Box display="flex" justifyContent="center">
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
        <Typography>Add a task</Typography>
      </IconButton>
    </Box>
  )
}

export default AddTaskButton
