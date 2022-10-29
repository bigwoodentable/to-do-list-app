import React, { useState } from 'react'
import TaskItem from './TaskItem.jsx'
import { useStateIfMounted } from 'use-state-if-mounted'
import AddTaskForm from './forms/AddTaskForm.jsx'
import ListComponent from './ListComponent.jsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { getAllLists } from '../apis/lists.js'
// Delete this when refactoring
import { tasksMockData, listsMockData, allLists } from './mockdata'
import { useRef } from 'react'

/*
data shape:
[
  { listId: 1, listName: 'Kitchen', tasks: [] },
  { listId: 1, listName: 'Kitchen', tasks: [] },
  { listId: 1, listName: 'Kitchen', tasks: [] },
]
*/

// Consider renaming this component
function Tasks() {
  const [lists, setLists] = useStateIfMounted([])
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  console.log('update', update)

  useEffect(async () => {
    setLists(await getAllLists())
  }, [update])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return lists.map((listItem, i) => (
    <React.Fragment key={i}>
      <AddTaskForm
        open={open}
        handleClose={handleClose}
        listId={listItem.listId}
        setUpdate={setUpdate}
      />
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Box>
      <ListComponent key={i} listItem={listItem} setUpdate={setUpdate} />
    </React.Fragment>
  ))
}

export default Tasks
