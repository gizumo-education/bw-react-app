import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const completedTodoList = get(todoState)
    console.log(completedTodoList);
    const r = completedTodoList.filter((todo) => todo.isCompleted)
    console.log(r)
    return r
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const incompleteTodoList = get(todoState)
    return incompleteTodoList.filter((todo) => !todo.isCompleted)    
  },
})

