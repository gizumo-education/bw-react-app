import { atom, selector } from "recoil";

/** @doc アプリケーション全体で管理するState */
export const todoState = atom({
  key: 'todoState',
  default: [],
})
/** @doc 完了済みのTodoを計算する */
export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    const completedTodoList = todos.filter((todo) => todo.isCompleted)
    return completedTodoList;
  }
})
/** @doc 未完了のTodoを計算する */
export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    const incompleteTodoList = todos.filter((todo) => !todo.isCompleted)
    return incompleteTodoList;
  }
})