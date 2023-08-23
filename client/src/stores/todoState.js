import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({get}) => {
    const completedTodoListStates = get(todoState)
    return completedTodoListStates.filter((completedList) => completedList.isCompleted === true)
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    const incompleteTodoLists = get(todoState)
    return incompleteTodoLists.filter((todoList) => todoList.isCompleted === false)
  },
})