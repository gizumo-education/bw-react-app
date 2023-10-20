import { useState,useEffect } from 'react' // 追加
import { axios } from '../../../utils/axiosConfig' // 追加

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])
  

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({data}) => {
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