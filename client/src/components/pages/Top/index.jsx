import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'
import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import styles from './index.module.css'

export const Top = () => {
  // ---- state ----
  // Todo情報の保持、更新
  const [todos, setTodos] = useState([])
  // 入力値の保持、更新
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  }) //useStateの引数は初期値
  // 表示・非表示の切り替え
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  // ボタンをクリックした時のtrue/false切り替えの処理
  const handleAddTaskButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(true)
  }, [])
  const handleCancelButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(false)
  }, [])
  // 入力内容を反映する処理
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target // 分割代入。nameには入力されたname属性が入り、valueにはその内容が入る
    // console.log('name:', name, 'value:', value)
    setInputValues((prev) => ({ ...prev, [name]: value })) // スプレッド構文
  }, [])
  // Submitボタンを押した時の処理
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // console.log(data)
        setInputValues({title: '', description: ''})
        setIsAddTaskFormOpen(false)
        // setTodos({}) // 更新関数を動かしてあげないと再レンダリングされない
      })
    },
    [inputValues]
  )


  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // console.log('data:', data) // Todo情報3つ分
      setTodos(data) // 更新関数。useEffectを使っているので、初回レンダリング時のみ実行される。
    }).catch(({err}) => {
      console.log(err)
    })
  }, [todos]) // 第二引数に依存配列を渡すと、その配列の変更の際にもuseEffect内の処理が実行される

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // console.log('todo:', todo) // Todo情報1つずつ
          // return <ListItem key={todo.id} todo={todo} />
          return <ListItem key={todo.id} todo={todo} />
        })}
        
        <li>
          {/* trueの場合はToDoの追加フォームを表示し、falseの場合は「タスクを追加」ボタンを表示 */}
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              onChange={handleInputChange}
              onCancelClick={handleCancelButtonClick} // onCancelClickというイベントは、Formコンポーネントのキャンセルボタンに定義
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
            <Button
              buttonStyle='indigo-blue'
              className={styles['add-task']}
              onClick={handleAddTaskButtonClick} // handleAddTaskButtonClick関数をpropsとして渡す
            >
              <Icon
                iconName='plus'
                color='orange'
                size='medium'
                className={styles['plus-icon']}
              />
              タスクを追加
            </Button>
          )}
        </li>
      </ul>
    </Layout>
  )
}
