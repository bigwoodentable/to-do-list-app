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
    <Paper
      style={{
        //task-card
        border: '0.1rem solid lightgrey',
        margin: '1rem',
        width: '25rem',
        padding: '1rem',
      }}
    >
      <Typography style={{ fontSize: '2rem' }}>{listName}</Typography>
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
      </Box>
    </Paper>
  )
}

export default List
