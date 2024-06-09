import { useEffect, useState, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { todoState, incompleteTodoListState } from '../../../stores/todoState'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'

import styles from './index.module.css'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import { errorToast } from '../../../utils/errorToast'

export const Top = () => {
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  const [editTodoId, setEditTodoId] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then((data) => {
      setTodos(data.data)
    })
  }, [setTodos])

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setIsAddTaskFormOpen(true)
    setEditTodoId('')
  }, [])

  const handleCancelButtonClick = useCallback(() => {
    setIsAddTaskFormOpen(false)
    setEditTodoId('')
  }, [])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const resetForm = () => {
    setInputValues({
      id: '',
      title: '',
      description: '',
    })
  }

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .post('http://localhost:3000/todo', inputValues)
        .then(({ data }) => {
          setTodos((prev) => [
            ...prev,
            {
              id: data.id,
              title: data.title,
              description: data.description,
            },
          ])
          setIsAddTaskFormOpen(false)
          resetForm()
        })
        .catch((error) => {
          errorToast(error.message)
        })
    },
    [setTodos, inputValues]
  )

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
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          setEditTodoId('')
          setTodos(
            todos.map((todo) =>
              todo.id === editTodoId
                ? { ...todo, title: data.title, description: data.description }
                : todo
            )
          )
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '更新するTodoが見つかりませんでした。画面を更新して再度お試しください'
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

  const handleDeleteButtonClick = useCallback((id) => {
    axios
      .delete(`http://localhost:3000/todo/${id}`)
      .then(({ data }) => {
        setTodos(data)
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 404:
            errorToast(
              '削除するTodoが見つかりませんでした。画面を更新してください。'
            )
            break
          default:
            errorToast(error.message)
            break
        }
      })
  }, [setTodos])

  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          setEditTodoId('')
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, isCompleted: data.isCompleted } : todo
            )
          )
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '完了・未完了を切り替えるTodoが見つかりませんでした。画面を更新して再度お試しください'
              )
              break
            default:
              errorToast(error.message)
              break
          }
        })
    },
    [todos, setTodos]
  )

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
              onDeleteButtonClick={handleDeleteButtonClick}
              onToggleButtonClick={handleToggleButtonClick}
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
              className={styles['add-task']}
              onClick={handleAddTaskButtonClick}
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
