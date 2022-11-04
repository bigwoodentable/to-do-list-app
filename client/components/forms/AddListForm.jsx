import React from 'react'
import Button from '@material-ui/core/Button'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import {
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { addList } from '../../apis/lists'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'
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
          border: '3px solid red',
          margin: '15px',
          width: '400px',
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
                  <Form>
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
