// eslint-disable-next-line import/no-extraneous-dependencies
import { atom, selector } from 'recoil'

// useEffectで受け取ったdataを保持している。
// 読み込まないが更新はされる
// 理由
// todoの情報が更新されなければ追加、編集などができない。
export const todoState = atom({
  // keyは識別するための文字列。
  key: 'todoState',
  default: [],
})

// selectorは、AtomやSelectorの値から計算された別の値
// atomとselectorは共に値を提供するという共通点がある
// 違いは、自身の値を持っているのがatom、
// 他のatomやselectorから値を計算しているのがselector
// selectorは、atomやselectorの値から計算された値であるため
// 読み込んでいるAtomやSelectorの値が更新された時に、Selectorの値も再計算される。

// todosがまとめてあるtodoStateをgetで取得。filterでisCompletedがtrueの値を取得し
// 表示する。= completedのtodoを表示
export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const completedTodo = get(todoState)
    return completedTodo.filter((todo) => todo.isCompleted)
    // return console.log(get(todoState))
  },
})

// todosがまとめてあるtodoStateをgetで取得。filterでisCompletedがfalseの値を取得し
// 表示する。= completedではないものを表示。
export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const getTodos = get(todoState)
    return getTodos.filter((todo) => !todo.isCompleted)
  },
})
