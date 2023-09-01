import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    // 完了済みのToDo一覧が表示されるようにしてください。
    return get(todoState).filter((todo) => todo.isCompleted);
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    // 未完了のToDo一覧を取得する
    return get(todoState).filter((todo) => !todo.isCompleted);
  },
})