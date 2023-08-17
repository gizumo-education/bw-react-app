import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const todos =get(todoState);
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
    //getメソッドは、引数にatomを取得するための関数を受け取る

// incompleteTodoListStateの返り値が空の配列になっているため、incompleteTodoListStateの返り値を未完了のToDo一覧を返すように変更していきましょう。
// 練習問題１
// store/todoState.jsのincompleteTodoListStateの返り値を未完了のToDo一覧を返すように変更し、画面に未完了のToDo一覧が表示されるようにしてください。
