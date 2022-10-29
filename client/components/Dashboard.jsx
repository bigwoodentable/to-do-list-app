import React, { useState } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import AddTaskForm from './forms/AddTaskForm.jsx'
import ListComponent from './ListComponent.jsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { getAllLists } from '../apis/lists.js'
import AddListForm from './forms/AddListForm.jsx'

function Dashboard() {
  const [lists, setLists] = useStateIfMounted([])
  const [addTaskFormOpen, setAddTaskFormOpen] = useState(false)
  const [addListFormOpen, setAddListFormOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  console.log('update', update)
  //--------------------------------------------------------
  //Gets all lists and all tasks from the database
  useEffect(async () => {
    setLists(await getAllLists())
  }, [update])

  //functions for AddTaskForm.jsx to create a new task
  const handleClickOpen = () => {
    setAddTaskFormOpen(true)
  }

  const handleClose = () => {
    setAddTaskFormOpen(false)
  }
  //--------------------------------------------------------
  //functions for AddListForm.jsx to create a new to-do list
  const handleAddList = () => {
    setAddListFormOpen(true)
    setUpdate((n) => n + 1)
  }

  const handleCloseAddList = () => {
    setAddListFormOpen(false)
  }
  //--------------------------------------------------------
  return (
    <React.Fragment>
      <AddListForm
        addListOpen={addListFormOpen}
        handleCloseAddList={handleCloseAddList}
        setUpdate={setUpdate}
      />
      <Box>
        <IconButton onClick={handleAddList}>ADD LIST</IconButton>
      </Box>
      {lists.map((listItem, i) => (
        <Box style={{ border: '3px solid red', margin: '15px' }} key={i}>
          <AddTaskForm
            addTaskFormOpen={addTaskFormOpen}
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
        </Box>
      ))}
    </React.Fragment>
  )
}

export default Dashboard
