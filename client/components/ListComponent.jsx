import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import TaskItem from './TaskItem'

function ListComponent({ listItem }) {
  const { listName, tasks } = listItem

  return (
    <Box>
      <Typography>{listName}</Typography>
      {tasks.map((task, i) => {
        return <TaskItem key={i} task={task} />
        // return <TaskItem key={i} task={task} setLists={setLists} />
      })}
    </Box>
  )
}

export default ListComponent
