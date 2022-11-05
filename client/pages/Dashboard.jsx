import React, { useState, useEffect } from 'react'
import List from '../components/List.jsx'
import AddListForm from '../components/forms/AddListForm.jsx'
import MoveForm from '../components/forms/MoveForm.jsx'
import MoveListButton from '../components/buttons/MoveListButton.jsx'
import DeleteTaskButton from '../components/buttons/DeleteTaskButton.jsx'
import { delTaskByTaskId } from '../apis/tasks.js'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { getAllLists } from '../apis/lists.js'
import { useStateIfMounted } from 'use-state-if-mounted'

function Dashboard() {
  const [lists, setLists] = useStateIfMounted([])
  const [moveFormOpen, setMoveFormOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  const [group, setGroup] = useState({})
  const [uncheckAll, setUncheckAll] = useState(false)

  //--------------------------------------------------------
  //Gets all lists and all tasks from the database
  useEffect(async () => {
    setLists(await getAllLists())
    setUncheckAll(false)
  }, [update])

  //--------------------------------------------------------
  //functions for MoveForm.jsx to move selected tasks to a different list
  const handleMoveFormOpen = () => {
    console.log('move')
    setMoveFormOpen(true)
    // setUpdate((n) => n + 1)
  }

  const handleCloseMoveForm = () => {
    setMoveFormOpen(false)
  }
  //--------------------------------------------------------
  //--------------------------------------------------------
  //deletes multiple selected tasks
  const handleDelGroup = () => {
    Object.entries(group).forEach((property) => {
      const taskId = property[0]
      delTaskByTaskId(taskId)
    })
    setUncheckAll(true)
    setGroup({})
    setUpdate((n) => n + 1)
  }
  return (
    <Box className="dashboard-layout">
      <Typography
        variant="h4"
        className="dashboard-title flex-container center-flex"
      >
        To-Doify
      </Typography>
      <Box className="flex-container center-flex">
        <MoveListButton handleMoveFormOpen={handleMoveFormOpen} />
        <DeleteTaskButton handleDelGroup={handleDelGroup} />
      </Box>
      <Box className="lists-layout flex-container flex-row flex-wrap">
        {lists.map((listDetails, i) => (
          <List
            key={i}
            listDetails={listDetails}
            setGroup={setGroup}
            setUpdate={setUpdate}
            uncheckAll={uncheckAll}
          />
        ))}
        <AddListForm setUpdate={setUpdate} />
        <MoveForm
          moveFormOpen={moveFormOpen}
          handleCloseMoveForm={handleCloseMoveForm}
          lists={lists}
          setUpdate={setUpdate}
          group={group}
          setGroup={setGroup}
          setUncheckAll={setUncheckAll}
        />
      </Box>
    </Box>
  )
}

export default Dashboard
