import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({get}) => {
    const completedTodoListStates = get(todoState)
    // 短くしました↓
    return completedTodoListStates.filter(completedList => completedList.isCompleted)
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    const incompleteTodoLists = get(todoState)
    return incompleteTodoLists.filter((todoList) => todoList.isCompleted === false)
  },
})