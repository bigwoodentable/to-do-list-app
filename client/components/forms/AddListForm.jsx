import React from 'react'
import Button from '@material-ui/core/Button'
import { Box, Paper } from '@mui/material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { addList } from '../../apis/lists'

const initialValues = {
  name: '',
}

const AddListForm = ({ addListOpen, handleCloseAddList, setUpdate }) => {
  const handleSubmit = (newList) => {
    addList(newList)
    handleCloseAddList()
    setUpdate((n) => n + 1)
  }

  return (
    <>
      <Box>
        <Dialog open={addListOpen} onClose={handleCloseAddList}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form>
                <DialogTitle align="center"> Edit Task</DialogTitle>
                <DialogContent>
                  <Field name="name" placeholder="Name" />
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Box>
    </>
  )
}

export default AddListForm
