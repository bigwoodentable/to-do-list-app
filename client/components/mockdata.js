const allLists = [
  {
    listName: 'Kitchen',
    tasks: [
      {
        name: 'Boiling Water',
        description: 'Boil the water',
        deadline: '1000-01-01 00:00:00',
      },
      {
        name: 'Chop the carrot',
        description: 'Chopping the carrot up into small pieces',
        deadline: '1000-01-01 00:00:00',
      },
    ],
  },
  {
    listName: 'Groceries',
    tasks: [
      {
        name: 'Apple',
        description: 'Buy apples',
        deadline: '1000-01-01 00:00:00',
      },
      {
        name: 'Oranges',
        description: 'Buy oranges',
        deadline: '1000-01-01 00:00:00',
      },
    ],
  },
]

const listsMockData = [
  { id: 1, list_name: 'Kitchen' },
  { id: 2, list_name: 'Groceries' },
  { id: 3, list_name: 'Gym' },
]

const tasksMockData = [
  {
    id: 1,
    lists_id: 1,
    name: 'Boiling Water',
    description: 'Boil the water',
    deadline: '1000-01-01 00:00:00',
  },
  {
    id: 2,
    lists_id: 1,
    name: 'Chop the carrot',
    description: 'Chopping the carrot up into small pieces',
    deadline: '1000-01-01 00:00:00',
  },
  {
    id: 3,
    lists_id: 2,
    name: 'Apple',
    description: 'Buy apples',
    deadline: '1000-01-01 00:00:00',
  },
  {
    id: 4,
    lists_id: 2,
    name: 'Oranges',
    description: 'Buy oranges',
    deadline: '1000-01-01 00:00:00',
  },
  {
    id: 5,
    lists_id: 3,
    name: 'Bicepts',
    description: '3 sets of 5',
    deadline: '1000-01-01 00:00:00',
  },
  {
    id: 6,
    lists_id: 3,
    name: 'Tricepts',
    description: '4 sets of 8',
    deadline: '1000-01-01 00:00:00',
  },
  {
    id: 7,
    lists_id: 3,
    name: 'Deltoids',
    description: '2 sets of 10',
    deadline: '1000-01-01 00:00:00',
  },
]

export { tasksMockData, listsMockData, allLists }
