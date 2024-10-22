import { atom, selector } from "recoil";

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const completedList = get(todoState).filter(({ isCompleted }) => isCompleted === true)
    return completedList
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const inCompletedList = get(todoState).filter(({ isCompleted }) => isCompleted === false)
    return inCompletedList
  },
})