import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Box } from '@mui/material'
import { Dialog, DialogContent, Typography } from '@material-ui/core'
import { updateTask } from '../../apis/tasks'
import { Stack } from '@mui/system'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import SubmitButton from '../buttons/SubmitButton'
import TextField from '@mui/material/TextField'

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
    handleCloseEdit()
    updateTask(taskWithId)
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
            {({ values, setFieldValue }) => (
              <Form style={{ width: '25rem' }}>
                <Typography
                  style={{
                    //form-title
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '1rem',
                    color: 'grey',
                  }}
                  variant="h6"
                >
                  Edit Task
                </Typography>

                <DialogContent>
                  <Stack spacing={3}>
                    <Field name="name" placeholder="Name" />
                    <Field
                      name="description"
                      placeholder="Description"
                      as="textarea"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} style={{ width: '100%' }} />
                        )}
                        label="Deadline"
                        value={values.deadline ? values.deadline : null}
                        onChange={(newValue) =>
                          setFieldValue('deadline', newValue)
                        }
                      />
                    </LocalizationProvider>
                    <SubmitButton />
                  </Stack>
                </DialogContent>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Box>
    </>
  )
}

export default EditTaskForm
