import React from 'react';
import TextField from '@mui/material/TextField';
import ButtonComponent from '../buttons/ButtonComponent';
import { Formik, Field, Form } from 'formik';
import { Box } from '@mui/material';
import { Dialog, DialogContent, Typography } from '@material-ui/core';
import { updateTask } from '../../apis/tasks';
import { Stack } from '@mui/system';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatDate } from '../../datetime-utils';

//edits a task
const EditTaskForm = ({
  editFormOpen,
  handleCloseEdit,
  taskId,
  task,
  listId,
  setLists,
}) => {
  const initialValues = {
    name: task.name,
    description: task.description,
    deadline: task.deadline,
  };

  const handleSubmit = (newTask) => {
    const taskWithId = { taskId, ...newTask };
    //--------------------------------------------------------
    //update the list that's saved in state to update the user interface
    setLists((lists) =>
      lists.map((list) => {
        if (list.listId === listId) {
          list.tasks = list.tasks.map((task) => {
            return task.taskId === taskId
              ? {
                  ...taskWithId,
                  deadline: formatDate(taskWithId.deadline),
                }
              : task;
          });
        }
        return list;
      }),
    );
    handleCloseEdit();
    updateTask(taskWithId);
  };

  return (
    <>
      <Box>
        <Dialog open={editFormOpen} onClose={handleCloseEdit}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form className="edit-task-form-layout">
                <Typography
                  variant="h6"
                  className="form-title flex-container center-flex "
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
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Deadline"
                        value={values.deadline ? values.deadline : null}
                        onChange={(newValue) =>
                          setFieldValue('deadline', newValue)
                        }
                        disableMaskedInput={true}
                      />
                    </LocalizationProvider>
                    <Box className="flex-container center-flex">
                      <ButtonComponent description="Submit" type="submit" />
                    </Box>
                  </Stack>
                </DialogContent>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Box>
    </>
  );
};

export default EditTaskForm;
