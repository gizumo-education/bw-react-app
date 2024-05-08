import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'//追加
import { Icon } from '../../ui/Icon'//追加
import { Form } from '../../ui/Form'//追加
import { errorToast } from '../../../utils/errorToast'

import styles from './index.module.css'

export const Top = () => {
  //取得したTodoの一覧を管理更新するためにuseStateを使用
  const [todos, setTodos] = useState([])
  //Topコンポーネントに編集するToDoのidを管理するstate
  const [editTodoId, setEditTodoId] = useState('')

  //ToDoの追加フォームに入力された値を保持するstate
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  //追加フォームの表示・非表示を管理するためのstate
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  //「タスクを追加」クリック時フォーム表示
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  //キャンセルクリック時フォーム非表示
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target//引数にeventを受け取り、event.targetからnameとvalueを取得しています。
    setInputValues((prev) => ({ ...prev, [name]: value }))//setInputValues関数を使ってinputValuesの値を更新
  }, [])

  //Todoの追加(第2引数には送信するデータ)
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()//ページ遷移をキャンセル
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        console.log(data)
        setTodos([...todos, data])
        setIsAddTaskFormOpen(false)
        setInputValues('')
      })
      .catch((error) => {
        errorToast(error.message)
      })
    },
    [inputValues]
  )

  //Todoの編集
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()//ページ遷移をキャンセル
      axios //第一引数APIのURL、第二引数送信するデータ
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          console.log(data)
          setTodos((todos) => {
            const newtodos = todos.map((todo) => {
              if (todo.id === data.id) {
                return {
                  ...todo,
                  'description':data.description,
                  'title':data.title
                }
              }
            return todo
            })
          return newtodos
          })
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
    [editTodoId, inputValues]
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

  //Todoの削除
  const handleDeleteButtonClick = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:3000/todo/${id}`)
        console.log(id)
        setTodos((todos) => {
          const newtodos = todos.filter((todos) => (todos.id !== id))
          return newtodos
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
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,//find,配列から条件に一致した最初の値を返すメソッド
        })
        .then(({ data }) => {
          console.log(data)
          setTodos((todos) => {
            const newtodos = todos.map((todo) => {
              if (todo.id === data.id) {
                return {...data}
              }
            return todo
            })
          return newtodos
          })
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

  //Todo一覧表示
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      console.log(data)
      setTodos(data)//更新関数を使用して再度レンダリング
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
          if (editTodoId === todo.id) {
            //編集フォームの表示・非表示
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
              key={todo.id}//リスト内のどの要素が追加・変更・削除されたかをReactが識別できるようにkeyを指定
              todo={todo}
              onEditButtonClick={handleEditButtonClick}//編集
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
