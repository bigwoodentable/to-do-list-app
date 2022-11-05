import React from 'react'
import Button from '@material-ui/core/Button'
import {
  Box,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
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
import SubmitButton from '../buttons/SubmitButton'

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
  setUncheckAll,
}) => {
  //moves multiple selected tasks
  const moveGroup = (listid) => {
    Object.entries(group).forEach((property) => {
      const taskId = property[0]
      moveTask(taskId, listid)
    })
    handleCloseMoveForm()
    setGroup({})
    setUncheckAll(true)
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
                        // <Box style={{ margin: '0.5rem' }}>
                        <FormLabel key={i} style={{ margin: '0.5rem' }}>
                          <Field
                            type="radio"
                            name="listId"
                            value={`${list.listId}`}
                            style={{ margin: '0.35rem' }}
                          />
                          {list.listName}
                        </FormLabel>
                        // </Box>
                      )
                    })}
                  </Box>
                </DialogContent>
                <SubmitButton />
              </Form>
            )}
          </Formik>
        </Dialog>
      </Box>
    </>
  )
}

export default MoveForm
