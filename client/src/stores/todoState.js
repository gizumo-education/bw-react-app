import { atom, selector, useSetRecoilState } from 'recoil'
import { Top } from '../components/pages/Top'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({get}) => {
    const todo =get(todoState)
    return todo.filter((todo) => todo.isCompleted === true )
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    const todo = get(todoState)
    return todo.filter((todo) => todo.isCompleted === false )
  },
})