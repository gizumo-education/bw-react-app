import { useState, useEffect, useCallback, useMemo } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import styles from './index.module.css'

export const Top = () => {
  // 取得したToDoの一覧を管理するstate
  const [todos, setTodos] = useState([])

  // 編集するToDoのidを管理するstate
  const [editTodoId, setEditTodoId] = useState('')

  // ToDoの追加フォームに入力された値を保持するstate
  const [inputValues, setInputValues] = useState({
    title: '', // タスク名
    description: '', // タスクの説明
  })

  // ToDoの追加フォームの表示・非表示切り替え
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // 「タスクを追加」ボタンをクリックした時の処理
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  // ToDoの追加フォームのキャンセルボタンをクリックした時の処理
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  // ToDoのタイトルと説明の入力欄に入力した値を
  // stateのinputValuesに反映する処理の実装
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => {
      // console.log(prev) // 文字入力イベント
      return { ...prev, [name]: value }
    })
  }, [])

  // ToDoの追加処理の実装
  const handleCreateTodoSubmit = useCallback((event) => {
    event.preventDefault()
    // console.log(event); // フォーム送信イベント
    axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
      console.log(data) // 送信されたデータ

      // 追加したToDoを表示させる
      setTodos((prevTodos) => {
        // console.log(...prevTodos); // 以前取得したデータの入った{}をスプレッド構文で出力
        // console.log(data); // 新しく追加したいデータ
        return ([...prevTodos, data]) // 53,54行目の2つをprevTodosに返す
      })

      // 追加フォーム非表示
      setIsAddTaskFormOpen(false)

      // 追加フォーム入力欄を空にする
      setInputValues({
        title: '',
        description: '',
      })
    })
  },
    [inputValues]
  )

  // 編集フォームで保存ボタンをクリックした時に、
  // ToDoのタイトルと説明を更新する処理
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          console.log(data, editTodoId) // 編集内容のデータが出力

          // 編集したToDoのタイトルと説明をToDoの一覧に反映
          setTodos((todo) => todo.map((fixTodos) => fixTodos.id === editTodoId ? data : fixTodos))

          // 編集フォームを非表示
          setEditTodoId(false)
        })
    },
    [editTodoId, inputValues]
  )

  // 編集ボタンがクリックされた時に、
  // editTodoIdに編集するToDoのidを格納する処理
  const handleEditButtonClick = useCallback(
    (id) => {
      setIsAddTaskFormOpen(false)
      setEditTodoId(id)

      const targetTodo = todos.find((todo) => todo.id === id) // inputValuesに格納
      setInputValues({
        title: targetTodo.title,
        description: targetTodo.description,
      })
    },
    [todos]
  )

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data)
      console.log(data) // 配列データ
    })
  }, [])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          if (editTodoId === todo.id) {
            return (
              <li key={todo.id}>
                <Form
                  value={inputValues}
                  editTodoId={editTodoId}
                  onChange={handleInputChange}
                  onCancelClick={handleCancelButtonClick}
                  onSubmit={handleEditedTodoSubmit}
                />
              </li>
            )
          }
          return (
            <ListItem
              key={todo.id}
              todo={todo}
              onEditButtonClick={handleEditButtonClick}
            />
          )
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
