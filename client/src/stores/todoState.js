import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const todos = get(todoState);
    return todos.filter(todo => todo.isCompleted);
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const todos = get(todoState);
    return todos.filter(todo => !todo.isCompleted); // isCompleted プロパティで未完了の ToDo をフィルタリング
  },
})

// atomを使用してToDoの一覧を管理するためのstateを作成
// 完了済みのToDo一覧と未完了のToDo一覧を取得するためのselectorも作成