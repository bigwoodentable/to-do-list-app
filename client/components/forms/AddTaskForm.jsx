import { Button } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import React from 'react'
import { addTask } from '../../apis/tasks.js'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import AddIcon from '@mui/icons-material/Add'

const initialValues = {
  name: '',
  description: '',
  deadline: {},
}

const AddTaskForm = ({ addTaskFormOpen, handleClose, listId, setUpdate }) => {
  const handleSubmit = (task) => {
    //add task to db
    const taskWithListId = {
      ...task,
      listId,
    }
    addTask(taskWithListId, handleClose)
    setUpdate((n) => n + 1)
  }

  return (
    addTaskFormOpen && (
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Field name="name" placeholder="Task Name" />
              <Field
                name="description"
                placeholder="Description"
                as="textarea"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={values.deadline}
                  onChange={(newValue) => setFieldValue('deadline', newValue)}
                />
              </LocalizationProvider>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Button onClick={handleClose}>Close</Button>
      </>
    )
  )
}

export default AddTaskForm
