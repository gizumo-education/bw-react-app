import { useEffect, useState } from 'react'

import { Layout } from '../../ui/Layout'
import { axios } from '../../../utils/axiosConfig'

import styles from './index.module.css'
import { ListItem } from '../../ui/ListItem'

export const Top = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data);
    })
  }, [])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className='{styles.list'>
        {todos.map((todo) => {
          return <ListItem key={todo.id} todo={todo} />
        })}
      </ul>
    </Layout>
  )
}
