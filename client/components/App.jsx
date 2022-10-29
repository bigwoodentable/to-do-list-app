import { Paper, Typography } from '@mui/material'
import React from 'react'
import Tasks from './Tasks'

function App() {
  return (
    <Paper>
    <Typography>
      To-Do List
    </Typography>
    <Tasks />
  </Paper>
  )
}

export default App