import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { axios } from '../../../utils/axiosConfig'
import { todoState, incompleteTodoListState } from '../../../stores/todoState'
import { Layout } from '../../ui/Layout'
import styles from './index.module.css'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import { errorToast } from '../../../utils/errorToast'

export const Top = () => {
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
  /** 入力値 */
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  /** タスク追加フラグ */
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  /** 編集ボタンがクリックされた時に編集するToDoのidを格納 */
  const [editTodoId, setEditTodoId] = useState('')

  // Todo一覧を取得する
  useEffect(() => {
    axios.get('http://localhost:3000/todo')
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }, [setTodos])

  /** タスク追加フォーム表示 */
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({title: '', description: ''})
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  /** キャンセルボタンクリック時 */
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
    setInputValues({
      title: '',
      description: '',
    })
  }, [])

  /** フォームの入力値が変化したときの処理 */
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  /** タスク追加ボタンクリック時 */
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault();
      axios.post('http://localhost:3000/todo', inputValues)
        .then(({ data }) => {
          setTodos((prev) => [...prev, data]);
          setIsAddTaskFormOpen(false);
          setInputValues({
            title: '',
            description: '',
          })
        })
        .catch((error) => {
          errorToast(error.message)
        })
    }, [setTodos, inputValues]
  )

  /** 編集マーククリック時 */
  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false);
    setEditTodoId(id);
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])

  /** 編集結果を保存するとき */
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault();
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          const newTodos = todos.map((todo) => {
            if (todo.id === editTodoId) {
              return data;
            }
            return todo;
          })
          setTodos(newTodos)
          setEditTodoId('')
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast('更新するToDoが見つかりませんでした。画面を更新して再度お試しください。')
              break
            default:
              errorToast(error.message)
              break
          }
        })
    }, [setTodos, editTodoId, inputValues]
  )

  /** 削除ボタンクリック時 */
  const handleDeleteButtonClick = useCallback((id) => {
    axios.delete(`http://localhost:3000/todo/${id}`)
      .then(({ data }) => {
        setTodos(data)
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 404:
            errorToast('更新するToDoが見つかりませんでした。画面を更新して再度お試しください。')
            break
          default:
            errorToast(error.message)
            break
        }
      })
  }, [setTodos])

  /** 完了未完了切り替え */
  const handleToggleButtonClick = useCallback((id) => {
    axios.patch(`http://localhost:3000/todo/${id}/completion-status`, {
      isCompleted: todos.find((todo) => todo.id === id).isCompleted
    })
      .then(({ data }) => {
        setTodos(todos.map((todo) => {
          if (todo.id === id) {
            return data;
          }
          return todo;
        }))
      })
      .catch((error) => {
        switch (error.statusCode) {
          case 404:
            errorToast('更新するToDoが見つかりませんでした。画面を更新して再度お試しください。')
            break
          default:
            errorToast(error.message)
            break
        }
      })
  }, [todos, setTodos])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map(todo => {
          if (editTodoId === todo.id) {
            return (
              <li key={todo.id}>
                <Form
                  value={inputValues}
                  onCancelClick={handleCancelButtonClick}
                  onChange={handleInputChange}
                  onSubmit={handleEditedTodoSubmit}
                  editTodoId={editTodoId}
                  />
              </li>
            )
          }
          return (
            <ListItem
              todo={todo}
              key={todo.id}
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
              onCancelClick={handleCancelButtonClick}
              onChange={handleInputChange}
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
              <Button
                onClick={handleAddTaskButtonClick}
                buttonStyle = 'indigo-blue'
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
            )
          }
        </li>
      </ul>
    </Layout>
  )
}
