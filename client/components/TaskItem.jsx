import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { Box, IconButton } from '@mui/material'
import { delTaskByTaskId, taskCompleted } from '../apis/tasks'
import DeleteIcon from '@mui/icons-material/Delete'

function TaskItem({ task, setUpdate }) {
  const { taskId, name, description, deadline } = task

  const handleDelete = () => {
    delTaskByTaskId(taskId)
    setUpdate((n) => n + 1)
  }

  const handleCompleted = () => {
    taskCompleted(taskId)
    setUpdate((n) => n + 1)
  }

  return (
    <>
      <Box>
        <IconButton onClick={handleCompleted}>COMPLETED</IconButton>
      </Box>
      <Box>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Paper>
        <Accordion>
          <AccordionSummary>
            <Typography style={{ fontWeight: 'bold' }}>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h8" fontWeight={'bold'}>
              Deadline: {deadline}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}

export default TaskItem
