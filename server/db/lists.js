const connection = require('./connection');
const { getTasksByListId, delTaskByListId } = require('./tasks');

//gets all lists together with all tasks
const getListsAll = async (db = connection) => {
  const listsIdsNames = await db('lists').select('id', 'list_name as listName');
  const listPromises = listsIdsNames.map(async (list) => {
    return {
      listId: list.id,
      listName: list.listName,
      tasks: await getTasksByListId(list.id),
    };
  });

  return Promise.all(listPromises);
};

//adds a list
const addList = (newList, db = connection) => {
  const listFormatted = {
    list_name: newList.name,
  };

  return db('lists').insert(listFormatted);
};

//deletes a list by the list's id
const delListByListId = async (listId, db = connection) => {
  await delTaskByListId(listId);
  return db('lists').where('id', listId).del();
};

module.exports = { getListsAll, addList, delListByListId };
