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
  const [todos, setTodos] = useState([]) // 取得したToDoの一覧を管理するためのuseState
  const [editTodoId, setEditTodoId] = useState('') //ToDoの編集フォームを切り替えるためのuseState
  const [inputValues, setInputValues] = useState({ //取得できたtitleとdescriptionを管理するためのuseState
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' }) 
    setEditTodoId('')  //空文字を指定することにより、if文の判定に一致しなくなりフォームを非表示にできる ※30行目も該当
    setIsAddTaskFormOpen(true)
  }, [])

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('') 
    setIsAddTaskFormOpen(false)
  }, [])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
    //console.log(prev);
  }, [])

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        console.log(data)
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

  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          //console.log(data)
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === editTodoId ? { ...inputValues, ...data } : todo
            )
          )
          setEditTodoId('')
          setInputValues({ title: '', description: '' }) //空文字にして編集の入力欄を空(クリア)にする
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '更新するToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
            break  //switch構文をぬける
            default:
            errorToast(error.message)
            break  //switch構文をぬける
          }
        })
    },
    [editTodoId, inputValues]
  )

  const handleEditButtonClick = useCallback(   //編集ボタンがクリックされたときに実行される処理
    (id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)
    const targetTodo = todos.find((todo) => todo.id === id)  //編集フォームを開いた時に、取得したtitleとdescriptionをデフォルトで表示させる
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])

  const handleDeleteButtonClick = useCallback((id) => {
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

  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          // console.log(data)
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              (todo.id === data.id ? data : todo)
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

  // ToDo一覧の取得
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      //console.log(data)
      setTodos(data)
    })
    .catch((error) => {
      errorToast(error.message)
    })
  }, [])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          if (editTodoId === todo.id) {  //厳密等価等価演算子を使用し、格納されているIDが一致しているかどうかを条件分岐によって判定する
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