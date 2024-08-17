import { useState, useEffect } from 'react'
import { axios } from '../../../utils/axiosConfig'
import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'


import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // console.log('data:', data) // Todo情報3つ分
      setTodos(data)
    })
  }, [])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // console.log('todo:', todo) // Todo情報1つずつ
          return <ListItem key={todo.id} todo={todo} />
        })}
      </ul>
    </Layout>
  )
}
