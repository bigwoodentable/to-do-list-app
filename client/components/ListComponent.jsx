import { IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { delListByListId } from '../apis/lists'
import AddTaskForm from './forms/AddTaskForm'
import EditIcon from '@mui/icons-material/Edit'
import TaskItem from './TaskItem'
import { delTaskByTaskId } from '../apis/tasks'
import MoveForm from './forms/MoveForm'

import DeleteListButton from './buttons/DeleteListButton'
import DeleteTaskButton from './buttons/DeleteTaskButton'

const ListComponent = ({ listDetails, setUpdate, setGroup, group }) => {
  const { listId, listName, tasks } = listDetails

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
    <Paper
      style={{
        //task-card
        border: '0.1rem solid lightgrey',
        margin: '15px',
        width: '25rem',
        padding: '1rem',
      }}
    >
      <Typography style={{ fontSize: '2rem' }}>{listName}</Typography>
      <AddTaskForm listId={listDetails.listId} setUpdate={setUpdate} />
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
      <Box
        style={{
          //flex-container
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          //Delete buttons for task
          marginTop: '1rem',
        }}
      >
        <DeleteListButton handleDeleteList={handleDeleteList} />
        <DeleteTaskButton handleDelGroup={handleDelGroup} />
      </Box>
    </Paper>
  )
}

export default ListComponent
