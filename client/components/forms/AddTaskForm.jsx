import React, { useState } from 'react'
import { Box, ClickAwayListener } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import { addTask } from '../../apis/tasks.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Stack } from '@mui/system'
import TextField from '@mui/material/TextField'
import AddTaskButton from '../buttons/AddTaskButton.jsx'
import SubmitButton from '../buttons/SubmitButton.jsx'

const initialValues = {
  name: '',
  description: '',
  deadline: {},
}

const AddTaskForm = ({ listId, setUpdate }) => {
  const [addTaskFormOpen, setAddTaskFormOpen] = useState(false)
  //functions for AddTaskForm.jsx to create a new task
  const handleClickOpen = () => {
    setAddTaskFormOpen(true)
  }

  const handleClose = () => {
    setAddTaskFormOpen(false)
  }

  const handleSubmit = (task) => {
    //add task to db
    const taskWithListId = {
      ...task,
      listId,
    }
    addTask(taskWithListId, handleClose)
    setUpdate((n) => n + 1)
  }

  return !addTaskFormOpen ? (
    <AddTaskButton handleClickOpen={handleClickOpen} />
  ) : (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        style={{
          //add-task-form-layout
          padding: '1rem',
          marginBottom: '1rem',
          //form-color variable
          backgroundColor: '#fafafa',
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="name" placeholder="Task Name" />
                <Field
                  name="description"
                  placeholder="Description"
                  as="textarea"
                  style={{
                    //textarea-description-task-add-form
                    maxWidth: '100%',
                    minWidth: '100%',
                    minHeight: '1.5rem',
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} style={{ width: '100%' }} />
                    )}
                    label="Deadline"
                    value={values.deadline}
                    onChange={(newValue) => setFieldValue('deadline', newValue)}
                  />
                </LocalizationProvider>
                <SubmitButton />
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </ClickAwayListener>
  )
}

export default AddTaskForm
