import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function SubmitButton() {
  return (
    //Button-format
    <Box display="flex" justifyContent="center">
      <IconButton color="primary" type="submit">
        <Typography>Submit</Typography>
      </IconButton>
    </Box>
  )
}

export default SubmitButton
