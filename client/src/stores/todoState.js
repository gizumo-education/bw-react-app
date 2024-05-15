
import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ( {get} ) => {
    const todoList = get(todoState)
    return todoList.filter((todo) => todo.isCompleted === true)
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ( {get} ) => {
    const todoList = get(todoState)
    return todoList.filter((todo) => todo.isCompleted === false)
  },
})