import { atom, selector } from 'recoil'

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const completedTodoList = get(todoState)
    return completedTodoList.filter(todo => todo.isCompleted)
  },
})

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    const incompleteTodoList = get(todoState)
    return incompleteTodoList.filter(todo => !todo.isCompleted)
  },
})

// useStateはコンポーネント内でしか管理できない：Local State
// →propsを渡すことでLocal Stateでもコンポーネントをまたぐことは一応可能
// →ページやコンポーネントをまたいで全体で共有：Global State
// RecoilはGlobal Stateを扱うための状態管理ライブラリのひとつ
// Atom：データ(Global State)の保存場所
// →Recoilから提供されたatom関数を使用、keyとdefaultプロパティが必要
// Selector：Atomの値から計算された別の値
// →keyとgetプロパティが必要、get関数でSelectorの値を計算する
// 複数のコンポーネントで同じAtomを使用することで、コンポーネントをまたいで状態共有が可能に
// Atomの使用：UseRecoilState→引数にAtomを渡す
// useRecoilValue→読み取り専用
// useSetRecoilState→書き込み専用