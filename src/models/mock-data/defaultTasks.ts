import { Task } from "../classes/TaskClass";
import { v4 as uuid } from 'uuid'
import { ListInterface } from "../interfaces/listInterface";
const listIds = [uuid(), uuid(), uuid(), uuid()]

export const defaultLists: ListInterface[] = [
  {
    listId: listIds[0],
    title: 'TO DO',
    tasks:
      [
        new Task({ title: 'Move Task', description: 'Click on a Task and move it around.', taskIndex: 0, taskId: uuid(), listId: listIds[0], listIndex: 0 }),
        new Task({ title: 'Move List', description: 'Click on a List and move it around.', taskIndex: 1, taskId: uuid(), listId: listIds[0], listIndex: 0 }),
      ]
  }, {
    listId: listIds[1],
    title: 'IN PROGRESS',
    tasks:
      [
        new Task({ title: 'About App front-end', description: 'This app is created using TypeScript, React and the amazing react-dnd library.', taskIndex: 0, taskId: uuid(), listId: listIds[1], listIndex: 1 }),
        new Task({ title: 'About App back-end', description: 'The backend logic is developed using Node.js, Express.js, Mongodb, and GraphQL.', taskIndex: 1, taskId: uuid(), listId: listIds[1], listIndex: 1 }),

      ]
  }, {
    listId: listIds[2],
    title: 'REVIEW',
    tasks:
      [
        new Task({ title: 'Add Task', description: 'Try adding a new task to a list.', taskIndex: 0, taskId: uuid(), listId: listIds[2], listIndex: 2 }),
        new Task({ title: 'Add List', description: 'Try adding a new list to the board.', taskIndex: 1, taskId: uuid(), listId: listIds[2], listIndex: 2 }),
      ]
  }, {
    listId: listIds[3],
    title: 'DONE',
    tasks:
      [
        new Task({ title: 'Delete Task', description: 'Try to delete a task from a list.', taskIndex: 0, taskId: uuid(), listId: listIds[3], listIndex: 3 }),
        new Task({ title: 'Delete List', description: 'Try to delete a list from the board.', taskIndex: 1, taskId: uuid(), listId: listIds[3], listIndex: 3 }),
      ]
  }
]