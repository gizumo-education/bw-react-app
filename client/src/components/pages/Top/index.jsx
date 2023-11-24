import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { useState,useEffect } from 'react' // 追加
import { axios } from '../../../utils/axiosConfig'
import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([]) // 追加
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // API通信でTodoデータ引っ張り
      console.log(data)
      // todoデータ(配列*オブジェクト)をコンソールに表示
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
