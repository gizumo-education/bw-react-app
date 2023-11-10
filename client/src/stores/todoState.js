import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

//  Section 23 練習問題２
export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const completetodos = get(todoState)
    return completetodos.filter((todo) => todo.isCompleted)
  },
})

//  Section 23 練習問題１
export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const incompletetodos = get(todoState)
    return incompletetodos.filter((todo) => !todo.isCompleted)
  },
})