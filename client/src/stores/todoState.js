import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
    key: 'completedTodoListState',
    get: ({ get }) => {//追加
      const todos = get(todoState);
      return todos.filter((todo) => todo.isCompleted);
    },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {//追加
    const todos = get(todoState);
    return todos.filter((todo) => !todo.isCompleted);
  },
})