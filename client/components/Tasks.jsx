import React, { useState } from 'react'
import TaskItem from './TaskItem.jsx'
import { useStateIfMounted } from 'use-state-if-mounted'
import AddTaskForm from './forms/AddTaskForm.jsx'
import ListComponent from './ListComponent.jsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { tasksMockData, listsMockData, allLists } from './mockdata'
import { useEffect } from 'react'
import { getAllLists } from '../apis/lists.js'

/*
data shape:
[
  { list_name: 'Kitchen', tasks: [] },
  { list_name: 'Kitchen', tasks: [] },
  { list_name: 'Kitchen', tasks: [] },
]
*/

function Tasks() {
  const [lists, setLists] = useStateIfMounted([])
  const [open, setOpen] = useState(false)

  useEffect(async () => {
    setLists(await getAllLists())
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return lists.map((listItem, i) => (
    <React.Fragment key={i}>
      {/* <AddTaskForm open={open} handleClose={handleClose} setTasks={setTasks} /> */}
      <AddTaskForm open={open} handleClose={handleClose} />
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Box>
      <ListComponent key={i} listItem={listItem} />
    </React.Fragment>
  ))
}

export default Tasks
