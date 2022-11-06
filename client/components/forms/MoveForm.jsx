import React from 'react'
import { Box, FormLabel } from '@mui/material'
import { Dialog, DialogContent } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { moveTask } from '../../apis/tasks'
import ButtonComponent from '../buttons/ButtonComponent'

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
    //change to a diffirent list
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
                        <FormLabel key={i} className="move-form-label-layout">
                          <Field
                            className="move-form-field-layout"
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
                <Box className="flex-container center-flex">
                  <ButtonComponent description="Submit" type="submit" />
                </Box>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Box>
    </>
  )
}

export default MoveForm
