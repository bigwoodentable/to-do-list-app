import { Button, Typography } from '@mui/material'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import React from 'react'

const initialValues = {
  name: '',
  description: '',
  deadline: '',
}

function AddTaskForm({ open, handleClose, setTasks }) {
  const handleSubmit = (task) => {
    //change this to api function
    setTasks((tasks) => [...tasks, task.name])
  }

  return (
    open && (
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {() => (
            <Form>
              <Field name="name" placeholder="Name" />
              <Field
                name="description"
                placeholder="Description"
                as="textarea"
              />
              <Field name="deadline" placeholder="Deadline" />
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
