import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    // todoStatで表示される全部のToDoを取得
    const todos = get(todoState);

    // 完了済みのやつだけを取得する
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    
    // 完了済みのToDo一覧を返す
    return completedTodos;
  },
});


export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    // todoStatで表示される全部のToDoを取得
    const todos = get(todoState);

    // 未完了のやつだけを取得する
    const incompleteTodos = todos.filter((todo) => !todo.isCompleted);

    // 未完了のToDo一覧を返す
    return incompleteTodos;
  },
})
