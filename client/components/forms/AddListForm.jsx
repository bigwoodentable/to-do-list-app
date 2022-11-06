import React, { useState } from 'react';
import { addList } from '../../apis/lists';
import { Box, Paper } from '@mui/material';
import { ClickAwayListener } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import ButtonComponent from '../buttons/ButtonComponent';

//initial values for formmik
const initialValues = {
  name: '',
};

//adds a list
const AddListForm = ({ setLists }) => {
  const [open, setOpen] = useState(false);

  const handleFormOpen = () => {
    setOpen(true);
  };
  const handleFormClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (newList) => {
    const newListId = await addList(newList);
    //--------------------------------------------------------
    //update the list that's saved in state to update the user interface
    setLists((list) => [
      ...list,
      { listId: newListId, listName: newList.name, tasks: [] },
    ]);
    handleFormClose();
  };

  return (
    <>
      <Box className="add-list-form-layout">
        <ClickAwayListener onClickAway={handleFormClose}>
          <Paper className="flex-container flex-row flex-wrap center-flex fit-parent">
            {!open ? (
              <ButtonComponent
                icon={<AddIcon />}
                handleFunction={handleFormOpen}
                description="Add a new list"
              />
            ) : (
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values)}
              >
                {() => (
                  <Form className="add-list-field-layout">
                    <Field name="name" placeholder="Name" />
                    <ButtonComponent icon={<CheckIcon />} type="submit" />
                  </Form>
                )}
              </Formik>
            )}
          </Paper>
        </ClickAwayListener>
      </Box>
    </>
  );
};

export default AddListForm;
