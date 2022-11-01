const request = require('supertest')

const server = require('../server')
const db = require('../db/lists')
const log = require('../logger')

jest.mock('../logger')
jest.mock('../db/lists')

describe('GET /api/v1/lists/all', () => {
  it('responds with the correct lists', () => {
    const lists = [
      {
        listId: 1,
        listName: 'Test List A',
        tasks: [
          {
            taskId: 1,
            name: 'A: Test Task One',
            description: 'A: Test Task One Description',
            deadline: '2022-10-13T18:15:00.000Z',
          },
          {
            taskId: 2,
            name: 'A: Test Task Two',
            description: 'A: Test Task Two Description',
            deadline: '2023-10-13T18:15:00.000Z',
          },
        ],
      },
      {
        listId: 2,
        listName: 'Test List B',
        tasks: [
          {
            taskId: 1,
            name: 'B: Test Task One',
            description: 'B: Test Task One Description',
            deadline: '2022-10-13T18:15:00.000Z',
          },
          {
            taskId: 2,
            name: 'B: Test Task Two',
            description: 'B: Test Task Two Description',
            deadline: '2023-10-13T18:15:00.000Z',
          },
        ],
      },
    ]

    db.getListsAll.mockImplementation(() => {
      return Promise.resolve(lists)
    })

    return request(server)
      .get('/api/v1/lists/all')
      .then((res) => {
        expect(res.body[0]).toEqual(lists[0])
        expect(res.body[1]).toEqual(lists[1])
        return null
      })
  })

  it('responds with status 500 and an error during a DB error', () => {
    db.getListsAll.mockImplementation(() =>
      Promise.reject(new Error('mock error'))
    )
    return request(server)
      .get('/api/v1/lists/all')
      .expect(500)
      .then((res) => {
        expect(log).toHaveBeenCalledWith('mock error')
        expect(res.body.error.title).toBe('Unable to retrieve lists')
        return null
      })
  })
})
