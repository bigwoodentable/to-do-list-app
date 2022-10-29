import React, { useState } from 'react'
import TaskItem from './TaskItem.jsx'
import { useStateIfMounted } from 'use-state-if-mounted'
import AddTaskForm from './forms/AddTaskForm.jsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const tasksMockData = [
  { name: 'cook', description: 'Cookign Class', deadline: '010101' },
  { name: 'clean', description: 'Cleaning class', deadline: '010101' },
  { name: 'wash', description: 'Washing Class', deadline: '010101' },
]

function Tasks() {
  const [tasks, setTasks] = useStateIfMounted(tasksMockData)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <AddTaskForm open={open} handleClose={handleClose} setTasks={setTasks} />
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Box>
      {tasks.map((task, i) => (
        <TaskItem key={i} task={task} setTasks={setTasks} />
      ))}
    </React.Fragment>
  )
}

export default Tasks
