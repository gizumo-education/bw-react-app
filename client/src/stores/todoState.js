import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const allTodos = get(todoState)
    const completedTodos = allTodos.filter((todo) => todo.isCompleted)
    return completedTodos
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const allTodos = get(todoState)
    const incompleteTodos = allTodos.filter((todo) => !todo.isCompleted)
    return incompleteTodos
  },
})
