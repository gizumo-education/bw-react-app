import { useState, useEffect } from 'react' // レンダリングするのを防ぐことができるuseEffect、useState
import { axios } from '../../../utils/axiosConfig' // API取得インポート

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem' // APIで取得した、3つのToDoを表示するためのコンポーネント

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {

      setTodos(data); // setTodosの呼び出しでtodosステートにデータをセット
    });
  }, []);

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          return <ListItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </Layout>
  );
}
