import React, { useState } from 'react'
import { useStateIfMounted } from 'use-state-if-mounted'
import ListComponent from './ListComponent.jsx'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
import { useEffect } from 'react'
import { delListByListId, getAllLists } from '../apis/lists.js'
import AddListForm from './forms/AddListForm.jsx'

function Dashboard() {
  const [lists, setLists] = useStateIfMounted([])
  const [addListFormOpen, setAddListFormOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  console.log('update', update)
  //--------------------------------------------------------
  //Gets all lists and all tasks from the database
  useEffect(async () => {
    setLists(await getAllLists())
  }, [update])

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
      {lists.map((listDetails, i) => (
        <ListComponent
          key={i}
          listDetails={listDetails}
          setUpdate={setUpdate}
        />
      ))}
    </React.Fragment>
  )
}

export default Dashboard
