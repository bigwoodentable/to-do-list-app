import React from 'react';
import { render, screen } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('displays correct number of tasks from props provided to List', () => {
    const mockList = {
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
    };

    render(<List listDetails={mockList} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText('No tasks in this list.')).toBeNull();
  });

  it('displays "No tasks in this list." if no tasks are provided.', () => {
    const mockListNoTasks = {
      listId: 2,
      listName: 'Test List B',
      tasks: [],
    };

    render(<List listDetails={mockListNoTasks} />);
    expect(screen.queryByRole('listitem')).toBeNull();
    expect(screen.getByText('No tasks in this list.'));
  });
});
