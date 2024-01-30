//top
import {  useState, useEffect } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'

import styles from './index.module.css'

export const Top = () => {
  const [ todos, setTodos ] = useState([])
  // todoの追加フォームに入力された値を保持するため
  const [ inputValues, setInputValues ] = useState({
    title: '',
    description: '',
  })

 // 以下のuseEffectの処理を追加　ここ木原さんに聞きたい
 useEffect(() => {
  axios.get('http://localhost:3000/todo').then(({ data }) => {
    console.log(data)
    // console.log(todos)
    //dataをtodosに格納したい
    setTodos(data); //どいういみだっけ
  })
}, [])

  return (
    <Layout>
      {/* layoutコンポーネントに入れ子として以下を渡す(children) */}
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {
        todos.map((todo) => {
          return <ListItem key={todo.id} todo={todo} />
          // 上記のtodo = {todo}がわからない →mpメソッドで上書きされるデータ一式？？かな？？
          })}
          {/* //ボタンを追加 */}
          <li>
            <Button buttonStyle='indigo-blue' className={styles['add-task']}>
              <Icon
                iconName='plus'
                color='orange'
                size='medium'
                className={styles['plus-icon']}
               />
               タスクを追加
             </Button>
          </li>
      </ul>
    </Layout>
  )
}