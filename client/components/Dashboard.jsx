import React, { useRef, useState } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import ListComponent from './ListComponent.jsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import { useEffect } from 'react'
import { delListByListId, getAllLists } from '../apis/lists.js'
import AddListForm from './forms/AddListForm.jsx'
import MoveForm from './forms/MoveForm.jsx'

function Dashboard() {
  const [lists, setLists] = useStateIfMounted([])
  const [addListFormOpen, setAddListFormOpen] = useState(false)
  const [moveFormOpen, setMoveFormOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  const [group, setGroup] = useState({})
  console.log('group', group)
  //--------------------------------------------------------
  //Gets all lists and all tasks from the database
  useEffect(async () => {
    setLists(await getAllLists())
  }, [update])

  //functions for AddListForm.jsx to create a new to-do list
  const handleAddListOpen = () => {
    setAddListFormOpen(true)
    setUpdate((n) => n + 1)
  }

  const handleCloseAddList = () => {
    setAddListFormOpen(false)
  }
  //--------------------------------------------------------
  //functions for MoveForm.jsx to move selected tasks to a different list
  const handleMoveFormOpen = () => {
    setMoveFormOpen(true)
    // setUpdate((n) => n + 1)
  }

  const handleCloseMoveForm = () => {
    setMoveFormOpen(false)
  }
  //--------------------------------------------------------
  return (
    <React.Fragment>
      <AddListForm
        addListOpen={addListFormOpen}
        handleCloseAddList={handleCloseAddList}
        setUpdate={setUpdate}
      />
      <MoveForm
        moveFormOpen={moveFormOpen}
        handleCloseMoveForm={handleCloseMoveForm}
        lists={lists}
        setUpdate={setUpdate}
        group={group}
        setGroup={setGroup}
      />
      <Box>
        <IconButton onClick={handleAddListOpen}>ADD LIST</IconButton>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleMoveFormOpen}>
          MOVE MULTIPLE TASKS
        </IconButton>
      </Box>

      {lists.map((listDetails, i) => (
        <ListComponent
          key={i}
          listDetails={listDetails}
          group={group}
          setGroup={setGroup}
          setUpdate={setUpdate}
        />
      ))}
    </React.Fragment>
  )
}

export default Dashboard
