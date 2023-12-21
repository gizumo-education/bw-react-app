import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({get}) => {
    const completeTodos = get(todoState).filter((todo) => todo.isCompleted)
    return completeTodos
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    const notCompleteTodos = get(todoState).filter((todo) => !todo.isCompleted)
    return notCompleteTodos
  },
})
