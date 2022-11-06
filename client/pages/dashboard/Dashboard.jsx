import React, { useState, useEffect } from 'react'
import List from '../../components/lists/List.jsx'
import AddListForm from '../../components/forms/AddListForm.jsx'
import MoveForm from '../../components/forms/MoveForm.jsx'
import ButtonComponent from '../../components/buttons/ButtonComponent.jsx'
import DeleteIcon from '@mui/icons-material/Delete'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import { delTaskByTaskId } from '../../apis/tasks.js'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { getAllLists } from '../../apis/lists.js'
import { useStateIfMounted } from 'use-state-if-mounted'

function Dashboard() {
  const [lists, setLists] = useStateIfMounted([])
  const [moveFormOpen, setMoveFormOpen] = useState(false)
  const [update, setUpdate] = useState(0)
  const [group, setGroup] = useState({})
  const [uncheckAll, setUncheckAll] = useState(false)
  console.log('lists', lists)
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
    setLists((lists) =>
      lists.map((list) => {
        list.tasks = list.tasks.filter((task) => !group[task.taskId])
        return list
      })
    )
    setUncheckAll(true)
    setGroup({})
    // setUpdate((n) => n + 1)
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
        <ButtonComponent
          icon={<TrendingFlatIcon />}
          handleFunction={handleMoveFormOpen}
          description="Move tasks"
          variant="h6"
        />
        <ButtonComponent
          icon={<DeleteIcon />}
          handleFunction={handleDelGroup}
          description="Delete Tasks"
          variant="h6"
        />
      </Box>
      <Box className="lists-layout flex-container flex-row flex-wrap">
        {lists.map((listDetails, i) => (
          <List
            key={i}
            listDetails={listDetails}
            setGroup={setGroup}
            setLists={setLists}
            setUpdate={setUpdate}
            uncheckAll={uncheckAll}
          />
        ))}
        <AddListForm setLists={setLists} />
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
