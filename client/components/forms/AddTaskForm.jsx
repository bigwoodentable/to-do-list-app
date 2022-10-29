import { Button } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import React from 'react'
import { addTaskByListId } from '../../apis/tasks.js'

const initialValues = {
  name: '',
  description: '',
  deadline: '',
}

const AddTaskForm = ({ addTaskFormOpen, handleClose, listId, setUpdate }) => {
  const handleSubmit = (task) => {
    //add task to db
    const taskWithListId = {
      ...task,
      listId,
    }
    addTaskByListId(taskWithListId, handleClose)
    setUpdate((n) => n + 1)
  }

  return (
    addTaskFormOpen && (
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {() => (
            <Form>
              <Field name="name" placeholder="Task Name" />
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
