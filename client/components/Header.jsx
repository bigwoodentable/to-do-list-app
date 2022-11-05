import React from 'react'
import DeleteTaskButton from './buttons/DeleteTaskButton'
import MoveListButton from './buttons/MoveListButton'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

function Header(handleMoveFormOpen, handleDelGroup) {
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center">
        <Typography color="primary" variant="h4">
          To-Doify
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <MoveListButton handleMoveFormOpen={handleMoveFormOpen} />
        <DeleteTaskButton handleDelGroup={handleDelGroup} />
      </Box>
    </React.Fragment>
  )
}

export default Header
