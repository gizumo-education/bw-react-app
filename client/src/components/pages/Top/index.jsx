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

  // ToDoの編集フォームの表示・非表示を切り替えるためのstate
  const [editTodoId, setEditTodoId] = useState('')

  // ToDoの追加フォームに入力された値を保持するためのstate
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  // 追加フォームの表示・非表示を管理するためのstate
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // 「タスクを追加」ボタンをクリックした時に実行する関数
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  // 追加フォームのキャンセルボタンをクリックした時に実行する関数
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  // ToDoのタイトルと説明の入力欄に入力した値をstateのinputValuesに反映する
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      console.log(data)
      setTodos(data)
    })
  }, [])

  // 追加したToDoが一覧に表示される 練習問題＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // 追加したToDoが一覧に表示される処理
        setTodos((prevTodos) => [...prevTodos, data]);
        // ToDoの追加フォームを非表示にする
        setIsAddTaskFormOpen(false)
        // ToDoの追加フォームの入力欄を空にする
        setInputValues('')
      })
    },
    [inputValues]
  )

  // 保存ボタンをクリックした時にToDoのタイトルと説明を更新する処理
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          // 編集したToDoのタイトルと説明をToDoの一覧に反映させる処理＊＊＊＊＊＊＊＊＊＊＊＊＊＊
          setTodos((prevTodos) => {
            // 編集対象のToDoを探してその内容を更新
            const updatedTodos = prevTodos.map((todo) => {
              if (todo.id === editTodoId) {
                return {
                  ...todo,
                  title: data.title,
                  description: data.description,
                }
              }
              return todo
            })
            return updatedTodos
          })

          // ToDoの編集フォームを非表示に
          setEditTodoId('')
        })
    },
    [editTodoId, inputValues]
  )

  // 編集ボタンがクリックされた時にeditTodoIdに編集するToDoのidを格納
  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])

  // ToDoの削除ボタンをクリックした時に実行する関数 練習問題＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  const handleDeleteButtonClick = useCallback((id) => {
    axios.delete(`http://localhost:3000/todo/${id}`).then(() => {
      // 削除が成功した場合、ToDo一覧から削除したToDoを除いた新しい一覧を設定する
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  }, [])

  // 切り替えボタンをクリックした時にToDoの完了・未完了を切り替える処理＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          // 切り替え後のToDoの完了・未完了の状態を画面に反映させる処理
          setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          )
        );
        console.log(data)
        })
    },
    [todos]
  )

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {

          // 編集フォームの表示・非表示を切り替え
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

          return <ListItem
            key={todo.id}
            todo={todo}
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
            onToggleButtonClick={handleToggleButtonClick}
          />
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
