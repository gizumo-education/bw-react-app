import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const allTodoList = get( todoState )
    const completedTodoList = allTodoList.filter(todo => todo.isCompleted === true)
    console.log(allTodoList, completedTodoList)

    return completedTodoList
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const allTodoList = get( todoState )
    const incompleteTodoList = allTodoList.filter(todo => todo.isCompleted === false)


    return incompleteTodoList
  },
})
