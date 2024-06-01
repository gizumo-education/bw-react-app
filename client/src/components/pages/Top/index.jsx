import { useState, useEffect } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])

  // 以下のuseEffectの処理を追加
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then((res) => {
      console.log(res.data)
      setTodos(res.data)
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