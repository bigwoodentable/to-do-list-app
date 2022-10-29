import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import TaskItem from './TaskItem'

const ListComponent = ({ listItem, setUpdate }) => {
  const { listName, tasks } = listItem
  return (
    <Box>
      <Typography>{listName}</Typography>
      {tasks.map((task, i) => {
        return <TaskItem key={i} task={task} setUpdate={setUpdate} />
      })}
    </Box>
  )
}

export default ListComponent
