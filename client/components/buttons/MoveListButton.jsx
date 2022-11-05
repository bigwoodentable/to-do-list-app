import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import { Box, IconButton, Typography } from '@mui/material'

function MoveListButton({ handleMoveFormOpen }) {
  return (
    <IconButton style={{ color: 'grey' }} onClick={handleMoveFormOpen}>
      <TrendingFlatIcon />
      <Typography style={{ color: 'grey' }} variant="h6">
        Move tasks
      </Typography>
    </IconButton>
  )
}

export default MoveListButton
