/* eslint-disable import/no-extraneous-dependencies */
import { atom, selector } from 'recoil'

// Recoilでは、Global Stateを 「Atom」 と呼ばれる単位で管理
// atom関数を用いてAtomを作成する
export const todoState = atom({
  key: 'todoState', // keyはAtomを一意に識別するための文字列
  default: [], // defaultは初期値を設定するためのプロパティ
})

// Selectorは、AtomやSelectorの値から計算された別の値
// selector関数でSelectorを作成
export const completedTodoListState = selector({
  key: 'completedTodoListState', // key: Selectorを一意に識別するための文字列
  get: ({get}) => { // get: Selectorの値を計算するための関数
    const initialTodo = get(todoState);
    return initialTodo.filter(({isCompleted})=>isCompleted === true)
  },
})

// SelectorとAtomの違い
// 自身が値を持っているのがAtom、他のAtomやSelectorから値を計算しているのがSelector

export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({get}) => {
    // get関数は引数にget関数を受け取ることができ、get関数を使用することで他のAtomやSelectorの値を取得することができます。
    const initialTodo = get(todoState);
    // console.log(initialTodo);
    // filter():配列の中から指定された関数で実装されているテストに合格した要素だけを抽出したシャローコピーを作成します。
    return initialTodo.filter(({isCompleted})=>isCompleted === false)
    // console.log(initialTodo.filter(({isCompleted})=>isCompleted === false))
  },
})

// Selectorは、AtomやSelectorの値から計算された値であるため、
// 読み込んでいるAtomやSelectorの値が更新された時に、Selectorの値も再計算されます。
// Selectorをコンポーネントで使用したい場合は、
// Atomと同様にuseRecoilState、useRecoilValue、useSetRecoilStateのいずれかのフックを使用します。
