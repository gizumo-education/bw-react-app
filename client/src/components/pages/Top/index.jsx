import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])
  const [inputValues, setInputValues] = useState({
    // inputValuesのtitleでタスク名、descriptionでタスクの説明を保持して、ToDoの追加時に使用
    // タスク名
    title: '',
    // タスクの説明
    description: '',
  })
  // 追加フォームの表示・非表示を管理するためのstate
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  // 「タスクを追加」ボタンをクリックした時に実行するhandleAddTaskButtonClick関数
  const handleAddTaskButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(true)
  }, [])
  // キャンセルボタンをクリックした時に実行するhandleCancelButtonClick関数
  const handleCancelButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(false)
  }, [])
  // handleInputChange関数は、引数にeventを受け取り、event.targetからnameとvalueを取得しています。
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])
  // handleCreateToDoSubmit関数は引数にeventを受け取り、event.preventDefault()でformタグのデフォルトのイベントであるページ遷移をキャンセルしています
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      // axiosのpostメソッドの第一引数にはAPIのURLを指定し、第二引数には送信するデータを指定します
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // 新しいToDoを追加
        setTodos((prevTodos) => [...prevTodos, data]);
        // ToDoフォームを非表示
        setIsAddTaskFormOpen(false);
        // 入力値クリア
        setInputValues({
          title: '',
          description: '',
        });
      })
    },
    [inputValues]
  )

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data)
      console.log(data)
    })
  }, [])



  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          return <ListItem key={todo.id} todo={todo} />
        })}
        <li>
          {isAddTaskFormOpen ? (
            <Form value={inputValues} onChange={handleInputChange} onCancelClick={handleCancelButtonClick} onSubmit={handleCreateTodoSubmit} />
          ) : (
            <Button buttonStyle='indigo-blue' onClick={handleAddTaskButtonClick} className={styles['add-task']}>
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
