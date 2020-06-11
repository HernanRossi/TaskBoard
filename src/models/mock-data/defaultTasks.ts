import { Task } from "../classes/TaskClass";
import { nanoid } from "nanoid"
import { ListInterface } from "../interfaces/listInterface";
const listIds = [nanoid(), nanoid(), nanoid(), nanoid()]

export const defaultLists: ListInterface[] = [
  {
    listId: listIds[0],
    title: 'TO DO',
    tasks:
      [
        new Task({ title: 'Move Task', description: 'Click on a Task and move it around.', taskId: nanoid(), listId: listIds[0]}),
        new Task({ title: 'Move List', description: 'Click on a List and move it around.', taskId: nanoid(), listId: listIds[0]}),
      ]
  }, {
    listId: listIds[1],
    title: 'IN PROGRESS',
    tasks:
      [
        new Task({ title: 'About App front-end', description: 'This app is created using TypeScript, React and the amazing react-dnd library.', taskId: nanoid(), listId: listIds[1]}),
      ]
  }, {
    listId: listIds[2],
    title: 'REVIEW',
    tasks:
      [
        new Task({ title: 'Add Task', description: 'Try adding a new task to a list.', taskId: nanoid(), listId: listIds[2]}),
        new Task({ title: 'Add List', description: 'Try adding a new list to the board.', taskId: nanoid(), listId: listIds[2]}),
      ]
  }, {
    listId: listIds[3],
    title: 'DONE',
    tasks:
      [
        new Task({ title: 'Delete Task', description: 'Try to delete a task from a list.', taskId: nanoid(), listId: listIds[3]}),
        new Task({ title: 'Delete List', description: 'Try to delete a list from the board.', taskId: nanoid(), listId: listIds[3]}),
      ]
  }
]