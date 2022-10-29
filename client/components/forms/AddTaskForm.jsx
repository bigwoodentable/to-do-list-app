import { Button } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import React from 'react'
import { addTaskByListId } from '../../apis/tasks.js'

const initialValues = {
  name: '',
  description: '',
  deadline: '',
}

function AddTaskForm({ open, handleClose, listId }) {
  const handleSubmit = (task) => {
    //add task to db
    const taskWithListId = {
      ...task,
      listId,
    }
    addTaskByListId(taskWithListId, handleClose)
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
