import { IconButton } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'

function EditTaskButton({ handleEditOpen }) {
  return (
    <IconButton onClick={handleEditOpen}>
      <EditIcon />
    </IconButton>
  )
}

export default EditTaskButton
