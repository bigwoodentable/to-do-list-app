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
  setGroup,
  setUncheckAll,
  setLists,
}) => {
  //moves multiple selected tasks
  const moveGroup = async (listId) => {
    const movedTasks = await Promise.all(
      Object.entries(group).map(async (property) => {
        const taskId = property[0]
        return await moveTask(taskId, listId)
      })
    )

    setLists((lists) =>
      lists.map((list) => {
        if (list.listId === listId) {
          //prevent duplication if user selects tasks in a list and also selects the same list as the new list
          //this requires refactoring - perhaps preventing users from moving tasks to its own list in the first place
          const unselectedTasks = list.tasks.filter(
            (task) => !group[task.taskId]
          )
          list.tasks = [...unselectedTasks, ...movedTasks]
        } else {
          list.tasks = list.tasks.filter((task) => !group[task.taskId])
        }
        return list
      })
    )
    handleCloseMoveForm()
    setUncheckAll(true)
    setGroup({})
  }

  const handleSubmit = (value) => {
    if (!value.listId) {
      alert('Sorry, please pick a list.')
      return null
    } else {
      const listId = Number(value.listId)
      moveGroup(listId)
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
