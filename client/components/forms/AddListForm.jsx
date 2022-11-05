import React, { useState } from 'react'
import { addList } from '../../apis/lists'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { ClickAwayListener } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'

const initialValues = {
  name: '',
}

const AddListForm = ({ setUpdate }) => {
  const [open, setOpen] = useState(false)

  const handleFormOpen = () => {
    setOpen(true)
  }
  const handleFormClose = () => {
    setOpen(false)
  }

  const handleSubmit = (newList) => {
    console.log('handleSubmit')
    addList(newList)
    setUpdate((n) => n + 1)
    handleFormClose()
  }

  return (
    <>
      <Box
        style={{
          margin: '15px',
          width: '25rem',
          height: '4.25rem',
          border: '0.1rem solid lightgrey',
        }}
      >
        <ClickAwayListener onClickAway={handleFormClose}>
          <Paper
            style={{
              //flex-container
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              //
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            {!open ? (
              <IconButton onClick={handleFormOpen}>
                <AddIcon />
                <Typography>Add a new list</Typography>
              </IconButton>
            ) : (
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values)}
              >
                {(values) => (
                  <Form style={{ marginTop: '1rem' }}>
                    <Field name="name" placeholder="Name" />
                    <IconButton type="submit">
                      <CheckIcon />
                    </IconButton>
                  </Form>
                )}
              </Formik>
            )}
          </Paper>
        </ClickAwayListener>
      </Box>
    </>
  )
}

export default AddListForm
