import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})


// 返り値を完了済みのToDo一覧を返すように変更し、画面に完了済みのToDo一覧
export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const completed = get(todoState)
    return completed.filter(todo =>
      todo.isCompleted === true
    )
  },
})


// 返り値を未完了のToDo一覧を返すように変更し、画面に未完了のToDo一覧が表示されるように
// isCompletedのfalseと未完了のToDo一覧を返すようにできる
export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    return todos.filter(todo =>
      todo.isCompleted === false
    )
  },
})