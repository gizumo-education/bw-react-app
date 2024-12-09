import { atom, selector } from 'recoil'

//atomに26個の一覧を受け取っている。（今回の場合）
export const todoState = atom({
  key: 'todoState',
  default: [],
})

//完了一覧表示
export const completedTodoListState = selector({
  key: 'completedTodoListState',
  get: ({ get }) => {
    const perfect = get(todoState)
    console.log(perfect)

//(get)は一つ一つ受け取っている
    return perfect.filter((get) => 
      get.isCompleted === true
    );
  },
})

//一覧表示
export const incompleteTodoListState = selector({
  key: 'incompleteTodoListState',
  get: ({ get }) => {
    //console.log({ get })
    const counter = get(todoState)
    //console.log(counter);
    return counter.filter((get) => 
      get.isCompleted === false
    );
  },
})