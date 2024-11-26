import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    return todos.filter(todo => !todo.isCompleted)
      // console.log(todo)
      // return todo.isCompleted ===false
    // console.log(incomplete)
  },
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const todos = get(todoState)
    console.log(todos)
    return todos.filter(todo => todo.isCompleted)
    // const completed = todos.filter(function(todo){
    // console.log(todo)
    // return todo.isCompleted
    // console.log(todo.isCompleted)
    // })
    // return completed
  },
})


/*getメソッドでtodoStateを取得
  todosからfilterメソッドで該当するもののみを配列化
  ※filterメソッドはtrueのみを抽出し配列化する
  今回は完了しているかいないかで分けるためtodo.isCompletedを確認
  引数が一つで処理が1行のため、内容もアロー関数にまとめられる
  まとめた処理をそのままリターンさせる*/