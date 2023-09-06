
import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    const completedTodos = todos.filter((todo) => todo.isCompleted)
    console.log(todoState);
    return completedTodos
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
    return incompletedTodos
  },
})