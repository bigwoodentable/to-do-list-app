const knex = require('knex')
const config = require('./knexfile').test
const testDb = require('knex')(config)

const db = require('./tasks')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('addTask', () => {
  it('inserts task correctly', async () => {
    const mockTask = {
      listId: 1,
      name: 'Testing Function',
      description: 'This is a description for the test.',
      deadline: '2022-10-13T18:15:00.000Z',
      status: 'incomplete',
    }

    expect.assertions(5)

    const newTask = await db.addTask(mockTask, testDb)
    expect(newTask.lists_id).toBe(1)
    expect(newTask.name).toMatch('Testing Function')
    expect(newTask.description).toMatch('This is a description for the test.')
    expect(newTask.deadline).toMatch('2022-10-13T18:15:00.000Z')
    expect(newTask.status).toMatch('incomplete')
    return null
  })
})
