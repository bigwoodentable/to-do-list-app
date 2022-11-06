import React from 'react'
import { IconButton, Typography } from '@mui/material'

function ButtonComponent({ icon, handleFunction, description, type, variant }) {
  return (
    <IconButton
      className="button-component"
      onClick={handleFunction}
      type={type}
    >
      {icon}
      {description && (
        <Typography className="button-description" variant={variant}>
          {description}
        </Typography>
      )}
    </IconButton>
  )
}

export default ButtonComponent
