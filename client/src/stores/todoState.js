import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({get}) => {
    const todo = get(todoState)
    const newtodo = todo.filter((array) => {return array.isCompleted == true})
    return newtodo
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    const todo = get(todoState)
    const newtodo = todo.filter((array) => {return array.isCompleted == false})
    return newtodo
  },
})