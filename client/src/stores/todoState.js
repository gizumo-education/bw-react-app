import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({get}) => {
    const todo = get(todoState)
    const completedTodos = todo.filter(array => array.isCompleted === true)
    return completedTodos
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    const todo = get(todoState)
    const isCompletedTodos = todo.filter(array => array.isCompleted === false)
    return isCompletedTodos
  },
})