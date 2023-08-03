import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'
import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import { errorToast } from '../../../utils/errorToast'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])//useStateフックを使って以下４つを初期化
  const [editTodoId, setEditTodoId] = useState('')
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)//追加フォームが開かれているかの制御

  const handleAddTaskButtonClick = useCallback(() => {//追加ボタンがクリックされたときに実行される関数
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  const handleCancelButtonClick = useCallback(() => {//追加フォームまたは編集フォームのキャンセルボタンがクリックされたときに実行される関数
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
    setInputValues({ title: '', description: '' })
  }, [])

  const handleInputChange = useCallback((event) => {//フォームの入力が変更されたときに実行される関数
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCreateTodoSubmit = useCallback(//追加するAPI通信
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        setTodos((prevTodos) => [...prevTodos, data])
        setIsAddTaskFormOpen(false)
        setInputValues({ title: '', description: '' })
      })
      .catch((error) => {
        errorToast(error.message)
      })
    },
    [inputValues]
  )

  const handleEditedTodoSubmit = useCallback(//編集するAPI通信
    (event) => {
      event.preventDefault()
      axios
      .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === editTodoId ? { ...todo, ...inputValues, ...data } : todo
            )
          )
          setEditTodoId('')
          setInputValues({ title: '', description: '' })

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

  const handleEditButtonClick = useCallback(//編集ボタンが押された時の処理
    (id) => {
      setIsAddTaskFormOpen(false)
      setEditTodoId(id)
      const targetTodo = todos.find((todo) => todo.id === id)
      setInputValues({
        title: targetTodo.title,
        description: targetTodo.description,
      })
    },
    [todos]
  )

  const handleDeleteButtonClick = useCallback((id) => {//削除するAPI通信　修正
    axios.delete(`http://localhost:3000/todo/${id}`).then(({ data }) => {
      setTodos(data)
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

  const handleToggleButtonClick = useCallback(//完了・未完了を切り替えるAPI通信　修正
    (id) => {
      const targetTodo = todos.find((todo) => todo.id === id)
      const updatedTodo = { ...targetTodo, isCompleted: !targetTodo.isCompleted }

      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: !targetTodo.isCompleted,
        })
        .then(({ data }) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === data.id ? updatedTodo : todo))
          )
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

  useEffect(() => {//初回レンダリング時に一度だけToDoリストを取得するAPI通信
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data);
    })
    .catch((error) => {
      errorToast(error.message)
    })
  }, [])

  return (//一覧の表示
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

          return (//他のコンポーネントへの関数の渡し
            <ListItem
              key={todo.id}
              todo={todo}
              onEditButtonClick={handleEditButtonClick}
              onDeleteButtonClick={handleDeleteButtonClick}
              onToggleButtonClick={handleToggleButtonClick}
            />
          )
        })}
        <li>
        {isAddTaskFormOpen ? (//追加ボタンの表示
          <Form value={inputValues} onChange={handleInputChange} onCancelClick={handleCancelButtonClick}onSubmit={handleCreateTodoSubmit} />
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
