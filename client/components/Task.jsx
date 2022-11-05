import React, { useState, useEffect } from 'react'
import EditTaskButton from './buttons/EditTaskButton'
import CompleteTaskButton from './buttons/CompleteTaskButton'
import EditTaskForm from './forms/EditTaskForm'
import { taskCompleted } from '../apis/tasks'
import { Box, Checkbox, ListItem, Typography, Paper } from '@mui/material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

const Task = ({ task, setUpdate, setGroup, uncheckAll }) => {
  const [checked, setChecked] = useState(false)
  const [editFormOpen, setEditFormOpen] = useState(false)
  const { taskId, name, description, deadline } = task

  const handleCompleted = () => {
    taskCompleted(taskId)
    setUpdate((n) => n + 1)
  }

  const handleEditOpen = () => {
    setEditFormOpen(true)
    setUpdate((n) => n + 1)
  }

  const handleCloseEdit = () => {
    setEditFormOpen(false)
    setUpdate((n) => n + 1)
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
        <Accordion style={{ width: '15rem' }}>
          <AccordionSummary>
            <Typography style={{ fontWeight: 'bold' }}>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize={'0.75rem'} fontWeight={'bold'}>
              {deadline === 'Invalid DateTime'
                ? 'No Deadline'
                : `Deadline: ${deadline}`}
            </Typography>

            {/* Task Description Body; form-color variable */}
            {description && (
              <Box
                style={{
                  padding: '1rem',
                  marginTop: '0.5rem',
                  backgroundColor: '#fafafa',
                }}
              >
                <Typography variant="body2">{description}</Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <EditTaskButton handleEditOpen={handleEditOpen} />
      <CompleteTaskButton handleCompleted={handleCompleted} />
      {/* forms that are by default hidden and only opens as a MUI dialog when prompted */}
      <EditTaskForm
        editFormOpen={editFormOpen}
        handleCloseEdit={handleCloseEdit}
        taskId={taskId}
        setUpdate={setUpdate}
        task={task}
      />
    </ListItem>
  )
}

export default Task
