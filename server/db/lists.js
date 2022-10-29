const connection = require('./connection')
const { getTasksByListId } = require('./tasks')

const getListsAll = async (db = connection) => {
  const listsIdsNames = await db('lists').select('id', 'list_name as listName')
  const listPromises = listsIdsNames.map(async (list) => {
    return {
      listId: list.id,
      listName: list.listName,
      tasks: await getTasksByListId(list.id),
    }
  })

  return Promise.all(listPromises)
}

module.exports = { getListsAll }
