import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { delListByListId } from '../apis/lists'
import AddTaskForm from './forms/AddTaskForm'
import Task from './Task'
import DeleteListButton from './buttons/DeleteListButton'

const List = ({ listDetails, setUpdate, setGroup, uncheckAll }) => {
  const { listId, listName, tasks } = listDetails

  //--------------------------------------------------------
  //deletes specified list
  const handleDeleteList = () => {
    delListByListId(listId)
    setUpdate((n) => n + 1)
  }

  return (
    <Paper className="list-item">
      <Typography variant="h5" className="list-title">
        {listName}
      </Typography>
      <AddTaskForm listId={listDetails.listId} setUpdate={setUpdate} />
      {tasks?.length ? (
        tasks.map((task, i) => {
          return (
            <Task
              key={i}
              task={task}
              setGroup={setGroup}
              setUpdate={setUpdate}
              uncheckAll={uncheckAll}
            />
          )
        })
      ) : (
        <Typography>No tasks in this list.</Typography>
      )}
      <Box className="flex-container flex-row right-flex del-list-button">
        <DeleteListButton handleDeleteList={handleDeleteList} />
      </Box>
    </Paper>
  )
}

export default List
