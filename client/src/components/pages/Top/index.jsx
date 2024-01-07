import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import { errorToast } from '../../../utils/errorToast' // エラーハンドリング


import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])
  const [editTodoId, setEditTodoId] = useState('')
  // [todos]は現在の状態を保持し、[setTodos]は新しい状態を引数として受け取り[todos]を更新する

  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])
  // 「タスクを追加」ボタンをクリックした時に実行する関数

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])
  // ToDoの追加フォームのキャンセルボタンをクリックした時に実行する関数

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {

      //練習問題
        console.log(data)
        setIsAddTaskFormOpen(false)
        setInputValues({})
        setTodos((prevTodos) => [...prevTodos, data]);
      })

      .catch((error) => {
        errorToast(error.message)
      })
    },
    [inputValues]
  )


  // 編集
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/editTodoId`, inputValues)
        .then(({ data }) => {
          console.log(data)

          // 練習問題「編集したToDoのタイトルと説明をToDoの一覧に反映し、ToDoの編集フォームを非表示にする」
          setTodos((prevTodos) => prevTodos.map((todo) => todo.id === editTodoId ? { ...todo, ...inputValues } : todo));
          setEditTodoId('');
          setIsAddTaskFormOpen(false);
        })

        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '更新するToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            default:
              errorToast(error.message)
              break
          }
        })
    },
    [editTodoId, inputValues]
  )

  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)

    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])


  // 削除
  const handleDeleteButtonClick = useCallback((id) => {
    
    // 練習問題
    axios.delete(`http://localhost:3000/todo/${id}`)
    .then(() => {
      console.log(id)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    })

    .catch((error) => {
      switch (error.statusCode) {
        case 404:
          errorToast(
            '削除するToDoが見つかりませんでした。画面を更新して再度お試しください。'
          )
          break
        default:
          errorToast(error.message)
          break
      }
    })
  }, [])


  // 完了・未完了の切り替え(✓)
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          console.log(data)
          setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, ...data } : todo));
        })

        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '完了・未完了を切り替えるToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            default:
              errorToast(error.message)
              break
          }
        })
    },
    [todos]
  )


  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      console.log(data)
      setTodos(data)
    })
    // ToDoの一覧取得

    .catch((error) => {
      errorToast(error.message)
    })
    // ネットワークエラーの警告表示

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
          // editTodoIdに格納されたToDoのidとtodosに格納されたToDoのidが一致するかどうかを判定

          return <ListItem key={todo.id} todo={todo} onEditButtonClick={handleEditButtonClick} onDeleteButtonClick={handleDeleteButtonClick} onToggleButtonClick={handleToggleButtonClick}/>
        })}

        <li>
          {isAddTaskFormOpen ? (
            <Form value={inputValues} onChange={handleInputChange} onCancelClick={handleCancelButtonClick} onSubmit={handleCreateTodoSubmit}/>
          ) : (
            <Button buttonStyle='indigo-blue' onClick={handleAddTaskButtonClick} className={styles['add-task']}>
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
