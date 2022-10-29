import React from 'react'
import Button from '@material-ui/core/Button'
import { Box, Paper } from '@mui/material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { updateTask } from '../../apis/tasks'

const EditTaskForm = ({
  editFormOpen,
  handleCloseEdit,
  taskId,
  setUpdate,
  task,
}) => {
  const initialValues = {
    name: task.name,
    description: task.description,
    deadline: task.deadline,
  }

  const handleSubmit = (task) => {
    const taskWithId = { taskId, ...task }
    console.log('handleSubmit', taskWithId)
    updateTask(taskWithId)
    handleCloseEdit()
    setUpdate((n) => n + 1)
  }

  return (
    <>
      <Box>
        <Dialog open={editFormOpen} onClose={handleCloseEdit}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form>
                <DialogTitle align="center"> Edit Task</DialogTitle>
                <DialogContent>
                  <Field name="name" placeholder="Name" />
                  <Field
                    name="description"
                    placeholder="Description"
                    as="textarea"
                  />
                  <Field name="deadline" placeholder="Deadline" />
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Box>
    </>
  )
}

export default EditTaskForm
