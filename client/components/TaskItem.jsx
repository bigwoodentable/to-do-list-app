import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import { Box  } from "@mui/material"



function TaskItem({ task }) {
   return (
    <>
      <Paper>
        <Accordion>
          <AccordionSummary >
            <Typography style={{ fontWeight: "bold" }}>
            {task}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box >
              <Typography variant="h8" fontWeight={"bold"}>
               Description
              </Typography>
              <Box >
                <Typography variant="body2">Description</Typography>
              </Box>
            </Box>
            <Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}

export default TaskItem
