import React, { useState } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { addTask } from '../../apis/tasks.js';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack } from '@mui/system';
import TextField from '@mui/material/TextField';
import ButtonComponent from '../buttons/ButtonComponent.jsx';
import AddIcon from '@mui/icons-material/Add';
import { formatDate } from '../../datetime-utils.js';

const initialValues = {
  name: '',
  description: '',
  deadline: {},
};

const AddTaskForm = ({ listId, setLists }) => {
  const [addTaskFormOpen, setAddTaskFormOpen] = useState(false);
  //functions for AddTaskForm.jsx to create a new task
  const handleClickOpen = () => {
    setAddTaskFormOpen(true);
  };

  const handleClose = () => {
    setAddTaskFormOpen(false);
  };

  const handleSubmit = async (task) => {
    //add task to db
    const taskWithListId = {
      ...task,
      listId,
    };
    const newTask = await addTask(taskWithListId, handleClose);
    console.log('newTask', newTask);
    setLists((lists) => {
      return lists.map((list) => {
        if (list.listId === listId) {
          list.tasks.push({
            ...task,
            taskId: newTask.taskId,
            deadline: formatDate(newTask.deadline),
          });
          return list;
        }
        return list;
      });
    });
  };

  return !addTaskFormOpen ? (
    <Box className="flex-container center-flex">
      <ButtonComponent
        icon={<AddIcon />}
        handleFunction={handleClickOpen}
        description={'Add a task'}
      />
    </Box>
  ) : (
    <ClickAwayListener onClickAway={handleClose}>
      <Box className="add-task-form-layout">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="name" placeholder="Task Name" />
                <Field
                  className="add-task-description-layout"
                  name="description"
                  placeholder="Description"
                  as="textarea"
                />
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Deadline"
                    value={values.deadline}
                    onChange={(newValue) => setFieldValue('deadline', newValue)}
                    disableMaskedInput={true}
                  />
                </LocalizationProvider>
                <Box className="flex-container center-flex">
                  <ButtonComponent description="Submit" type="submit" />
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </ClickAwayListener>
  );
};

export default AddTaskForm;
