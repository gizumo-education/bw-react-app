import { useCallback, useEffect, useState } from 'react'

import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { axios } from '../../../utils/axiosConfig'

import { todoState, incompleteTodoListState } from '../../../stores/todoState'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Form } from '../../ui/Form'

import { errorToast } from '../../../utils/errorToast'

import styles from './index.module.css'

export const Top = () => {
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)

  // const [todos, setTodos] = useState([])

  const [editTodoId, setEditTodoId] = useState('')

  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // input value更新
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  // ＋ボタンクリック、form開く
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])
  // キャンセルボタンクリック
  const handleCancelButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(false)
    setEditTodoId('')
  }, [])

  // 編集ボタンクリック
  const handleEditButtonClick = useCallback(
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

  // 削除ボタン
  const handleDeleteButtonClick = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:3000/todo/${id}`)
        .then((res) => {
          setTodos(res.data)
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
    },
    [setTodos]
  )

  // トグル切り替え
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          setTodos((prevState) =>
            prevState.map((val) =>
              val.id === data.id
                ? { ...data, isCompleted: data.isCompleted }
                : val
            )
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

  // タスク追加　練習問題
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .post('http://localhost:3000/todo', inputValues)
        .then(({ data }) => {
          setTodos((prevState) => [...prevState, data])
          setIsAddTaskFormOpen(false)
          setInputValues({ title: '', description: '' })
        })
        .catch((error) => {
          errorToast(error.message)
        })
    },
    [setTodos, inputValues]
  )

  // 編集タスク更新
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          setTodos((prevState) =>
            prevState.map((value) => (value.id === data.id ? data : value))
          )
          setInputValues({ title: '', description: '' })
          setEditTodoId('')
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

  // タスク取得
  useEffect(() => {
    axios
      .get('http://localhost:3000/todo')
      .then(({ data }) => {
        setTodos(data)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }, [setTodos])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className='{styles.list'>
        {/* Todo一覧表示 */}
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
              onDeleteButtonClick={handleDeleteButtonClick}
              onToggleButtonClick={handleToggleButtonClick}
            />
          )
        })}

        <li>
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              editTodoId={editTodoId}
              onChange={handleInputChange}
              onCancelClick={handleCancelButtonClick}
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
            <Button
              onClick={handleAddTaskButtonClick}
              buttonStyle='indigo-blue'
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
