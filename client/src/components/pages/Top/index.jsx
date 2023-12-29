import { useState, useEffect } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])
  // [todos]は現在の状態を保持する(初期値として空の配列がセットされている)
  // [setTodos]は状態を更新するための関数で、新しい状態を引数として受け取り[todos]を更新する

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // ToDoの一覧を取得
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
      </ul>
    </Layout>
  )
}
