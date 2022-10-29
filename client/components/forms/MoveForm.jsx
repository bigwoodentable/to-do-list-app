import React from 'react'
import Button from '@material-ui/core/Button'
import {
  Box,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { addList } from '../../apis/lists'
import { moveTask } from '../../apis/tasks'

const initialValues = {
  listId: 0,
}

const MoveForm = ({
  moveFormOpen,
  handleCloseMoveForm,
  lists,
  group,
  setUpdate,
  setGroup,
}) => {
  //moves multiple selected tasks
  const moveGroup = (listid) => {
    Object.entries(group).forEach((property) => {
      const taskId = property[0]
      moveTask(taskId, listid)
    })
    handleCloseMoveForm()
    setGroup({})
    setUpdate((n) => n + 1)
  }

  const handleSubmit = (value) => {
    if (!value.listId) {
      alert('Sorry, please pick a list.')
      return null
    } else {
      const listid = Number(value.listId)
      moveGroup(listid)
    }
  }

  return (
    <>
      <Box>
        <Dialog open={moveFormOpen} onClose={handleCloseMoveForm}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <DialogContent>
                  <Box role="group">
                    {lists.map((list, i) => {
                      return (
                        <FormLabel key={i}>
                          <Field
                            type="radio"
                            name="listId"
                            value={`${list.listId}`}
                          />
                          {list.listName}
                        </FormLabel>
                      )
                    })}
                  </Box>
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

export default MoveForm
