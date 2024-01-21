import { useState, useEffect, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { axios } from '../../../utils/axiosConfig'
import { todoState, incompleteTodoListState } from '../../../stores/todoState'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import { errorToast } from '../../../utils/errorToast' // エラーハンドリング

import styles from './index.module.css'

export const Top = () => {
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
  const [editTodoId, setEditTodoId] = useState('') // 編集中のToDoのidを保持
  const incompleteTodos = useRecoilValue(incompleteTodoListState);
  const [inputValues, setInputValues] = useState({title: '', description: '',}) // フォームの入力値の保持
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false) // 追加フォームの表示・非表示

  // 追加機能

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        console.log(data)
        setIsAddTaskFormOpen(false)
        setInputValues({})
        setTodos((prevTodos) => [...prevTodos, data]);
      })
      .catch((error) => {
        errorToast(error.message)
      })
    },
    [setTodos, inputValues]
  )

  // 編集機能

  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          console.log(data)
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
    [setTodos, editTodoId, inputValues]
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

  // 削除機能

  const handleDeleteButtonClick = useCallback((id) => {
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
  }, [setTodos])

  // チェックマーク

  const handleToggleButtonClick = useCallback((id) => {
      axios.patch(`http://localhost:3000/todo/${id}/completion-status`, {isCompleted: todos.find((todo) => todo.id === id).isCompleted,})
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
    [setTodos, todos]
  )

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      console.log(data)
      setTodos(data)
    })
    .catch((error) => {
      errorToast(error.message)
    })
  }, [setTodos])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {incompleteTodos.map((todo) => {
          if (editTodoId === todo.id) {
            return (
              <li key={todo.id}>
                <Form
                  value={inputValues}
                  editTodoId={editTodoId}
                  onChange={handleInputChange}
                  onCancelClick={handleCancelButtonClick} // キャンセルボタン
                  onSubmit={handleEditedTodoSubmit} // 送信ボタン
                />
              </li>
            )
          }

          return <ListItem
            key={todo.id}
            todo={todo}
            onEditButtonClick={handleEditButtonClick} // 編集ボタン
            onDeleteButtonClick={handleDeleteButtonClick} // 削除ボタン
            onToggleButtonClick={handleToggleButtonClick} // チェックボタン
          />
        })}
        <li>
          {isAddTaskFormOpen ? ( // 追加フォームの表示(true) or 追加ボタンの表示(false)
            <Form
              value={inputValues}
              onChange={handleInputChange}
              onCancelClick={handleCancelButtonClick}
              onSubmit={handleCreateTodoSubmit} />
          ) : (
            <Button
              buttonStyle='indigo-blue'
              onClick={handleAddTaskButtonClick}
              className={styles['add-task']}>
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
