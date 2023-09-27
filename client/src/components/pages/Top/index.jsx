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

  // 追加フォームの作成
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  // 追加フォームの表示・非表示
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // "タスクを追加"ボタンをクリックした時
  const handleAddTaskButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(true)
  },[])

  // キャンセルボタンをクリックした時
  const handleCancelButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(false)
  },[])

  // フォームに入力した値をinputValuesに反映
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({...prev, [name]: value }))
  })

  // 追加処理の実装
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) =>{
        console.log(data)
        setTodos((prev) => [...prev, data])
        setIsAddTaskFormOpen(false)
        // ? ↓もっと簡単な書き方ある？
        setInputValues({
          title: '',
          description: '',
        })
      })
    },
    [inputValues]
  )

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      console.log(data)
      setTodos(data)
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
            <Form
              value={inputValues}
              onChange={handleInputChange}
              onCancelClick={handleCancelButtonClick}
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
            <Button
              buttonStyle='indigo-blue'
              onClick={handleAddTaskButtonClick}
              className={styles['add-task']}
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
