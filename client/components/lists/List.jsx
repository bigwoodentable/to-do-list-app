import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { delListByListId } from '../../apis/lists'
import AddTaskForm from '../forms/AddTaskForm'
import Task from '../tasks/Task'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import ButtonComponent from '../buttons/ButtonComponent'

const List = ({
  listDetails,
  setUpdate,
  setGroup,
  group,
  uncheckAll,
  setLists,
}) => {
  const { listId, listName, tasks } = listDetails

  //--------------------------------------------------------
  //deletes specified list
  const handleDeleteList = () => {
    delListByListId(listId)
    setLists((lists) => lists.filter((list) => list.listId !== listId))
  }
  //--------------------------------------------------------
  return (
    <Paper className="list-item">
      <Typography variant="h5" className="list-title">
        {listName}
      </Typography>
      <AddTaskForm listId={listDetails.listId} setLists={setLists} />
      {tasks?.length ? (
        tasks.map((task, i) => {
          return (
            <Task
              key={i}
              task={task}
              uncheckAll={uncheckAll}
              setLists={setLists}
              // ***
              setGroup={setGroup}
              group={group}
              // ***
            />
          )
        })
      ) : (
        <Typography>No tasks in this list.</Typography>
      )}
      <Box className="flex-container flex-row right-flex del-list-button">
        <ButtonComponent
          icon={<DeleteSweepIcon />}
          handleFunction={handleDeleteList}
          description={'Delete List'}
        />
      </Box>
    </Paper>
  )
}

export default List
