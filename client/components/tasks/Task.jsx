import React, { useState, useEffect } from 'react'
import EditTaskForm from '../forms/EditTaskForm'
import { taskCompleted } from '../../apis/tasks'
import { Box, Checkbox, ListItem, Typography, Paper } from '@mui/material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ButtonComponent from '../buttons/ButtonComponent'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'

const Task = ({ task, setUpdate, setGroup, uncheckAll, setLists, listId }) => {
  const [checked, setChecked] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const { taskId, name, description, deadline } = task

  const handleCompleted = () => {
    taskCompleted(taskId)
    setLists((lists) =>
      lists.map((list) => {
        if (list.listId === listId) {
          const tasks = list.tasks.filter((task) => task.taskId !== taskId)
          return { ...list, tasks }
        }
        return list
      })
    )
  }

  const handleEditOpen = () => {
    setEditFormOpen(true)
  }

  const handleCloseEdit = () => {
    setEditFormOpen(false)
  }
  //--------------------------------------------------------
  // functions related to checkbox
  // Controls whether the checkbox is checked or not
  const handleCheck = (event) => {
    setChecked(event.target.checked)
  }

  // When checked, save the task's id in state. When unchecked, remove the task's id from state.
  const handleChecked = (event) => {
    if (event.target.checked) {
      setGroup((group) => {
        return { ...group, [taskId]: true }
      })
    } else {
      setGroup((group) => {
        delete group[taskId]
        return group
      })
    }
  }
  // Unchecks the checkbox whenever uncheckAll is true
  useEffect(() => {
    if (uncheckAll) {
      setChecked(false)
    }
  }, [uncheckAll])
  //--------------------------------------------------------
  return (
    <ListItem>
      <Checkbox
        checked={uncheckAll ? false : checked}
        onClick={handleCheck}
        onChange={handleChecked}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Paper>
        <Accordion className="task-layout">
          <AccordionSummary>
            <Typography variant="subtitle1" className="task-title">
              {name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" className="task-deadline">
              {deadline === 'Invalid DateTime'
                ? 'No Deadline'
                : `Deadline: ${deadline}`}
            </Typography>
            {description && (
              <Box className="task-description-layout">
                <Typography variant="body2">{description}</Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <ButtonComponent icon={<EditIcon />} handleFunction={handleEditOpen} />
      <ButtonComponent icon={<CheckIcon />} handleFunction={handleCompleted} />
      {/* forms that are by default hidden and only opens as a MUI dialog when prompted */}
      <EditTaskForm
        editFormOpen={editFormOpen}
        handleCloseEdit={handleCloseEdit}
        taskId={taskId}
        setUpdate={setUpdate}
        task={task}
        listId={listId}
        setLists={setLists}
      />
    </ListItem>
  )
}

export default Task
