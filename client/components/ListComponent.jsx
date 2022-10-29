import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { delListByListId } from '../apis/lists'
import AddTaskForm from './forms/AddTaskForm'
import EditIcon from '@mui/icons-material/Edit'
import TaskItem from './TaskItem'

const ListComponent = ({ listDetails, setUpdate }) => {
  const [addTaskFormOpen, setAddTaskFormOpen] = useState(false)
  const { listId, listName, tasks } = listDetails

  //functions for AddTaskForm.jsx to create a new task
  const handleClickOpen = () => {
    setAddTaskFormOpen(true)
  }

  const handleClose = () => {
    setAddTaskFormOpen(false)
  }
  //--------------------------------------------------------
  //deletes specified list
  const handleDeleteList = () => {
    delListByListId(listId)
    setUpdate((n) => n + 1)
  }

  return (
    <Box style={{ border: '3px solid red', margin: '15px' }}>
      <Typography>{listName}</Typography>
      <AddTaskForm
        addTaskFormOpen={addTaskFormOpen}
        handleClose={handleClose}
        listId={listDetails.listId}
        setUpdate={setUpdate}
      />
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={handleDeleteList}>DELETE LIST</IconButton>
      </Box>
      {tasks.map((task, i) => {
        return <TaskItem key={i} task={task} setUpdate={setUpdate} />
      })}
    </Box>
  )
}

export default ListComponent
