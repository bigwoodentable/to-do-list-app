import React from "react"
import ReportsItem from "./TaskItem.jsx"
import { useStateIfMounted } from "use-state-if-mounted"

const tasksMockData = ['cook', 'clean', 'eat']

function Tasks() {
  const [tasks, setTasks] = useStateIfMounted(tasksMockData)
  return tasks
    .map((task, i) => (
      <ReportsItem
        key={i}
        task={task}
      />
    ))
}

export default Tasks
