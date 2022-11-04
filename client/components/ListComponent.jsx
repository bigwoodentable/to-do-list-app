import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { delListByListId } from '../apis/lists'
import AddTaskForm from './forms/AddTaskForm'
import EditIcon from '@mui/icons-material/Edit'
import TaskItem from './TaskItem'
import { delTaskByTaskId } from '../apis/tasks'
import MoveForm from './forms/MoveForm'

const ListComponent = ({ listDetails, setUpdate, setGroup, group }) => {
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
  //--------------------------------------------------------
  //deletes multiple selected tasks
  const handleDelGroup = () => {
    Object.entries(group).forEach((property) => {
      const taskId = property[0]
      delTaskByTaskId(taskId)
    })
    setGroup({})
    setUpdate((n) => n + 1)
  }

  return (
    <Box
      style={{
        // position: 'absolute',
        border: '3px solid red',
        margin: '15px',
        width: '400px',
      }}
    >
      <Typography>{listName}</Typography>
      <AddTaskForm
        addTaskFormOpen={addTaskFormOpen}
        handleClose={handleClose}
        listId={listDetails.listId}
        setUpdate={setUpdate}
      />
      <Box className="button-group" display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleDelGroup}>
          DELETE MULTIPLE TASKS
        </IconButton>
      </Box>
      <Box className="button-group" display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Box>
      <Box className="button-group">
        <IconButton onClick={handleDeleteList}>DELETE LIST</IconButton>
      </Box>
      {tasks?.length ? (
        tasks.map((task, i) => {
          return (
            <TaskItem
              key={i}
              task={task}
              setGroup={setGroup}
              setUpdate={setUpdate}
            />
          )
        })
      ) : (
        <Typography>No tasks in this list.</Typography>
      )}
    </Box>
  )
}

export default ListComponent
