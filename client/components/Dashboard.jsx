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
  const [moveFormOpen, setMoveFormOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  const [group, setGroup] = useState({})
  console.log('group', group)
  //--------------------------------------------------------
  //Gets all lists and all tasks from the database
  useEffect(async () => {
    setLists(await getAllLists())
  }, [update])

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
      <MoveForm
        moveFormOpen={moveFormOpen}
        handleCloseMoveForm={handleCloseMoveForm}
        lists={lists}
        setUpdate={setUpdate}
        group={group}
        setGroup={setGroup}
      />
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="primary" size="large" onClick={handleMoveFormOpen}>
          MOVE MULTIPLE TASKS
        </IconButton>
      </Box>
      <Box
        style={{
          //flex-container
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginRight: '20px',
          marginTop: '5px',
          border: 'blue 3px solid',
          padding: '20px',
          margin: '20px',
          minWidth: '1000px',
        }}
      >
        {lists.map((listDetails, i) => (
          <ListComponent
            key={i}
            listDetails={listDetails}
            group={group}
            setGroup={setGroup}
            setUpdate={setUpdate}
          />
        ))}
        <AddListForm setUpdate={setUpdate} />
      </Box>
    </React.Fragment>
  )
}

export default Dashboard
