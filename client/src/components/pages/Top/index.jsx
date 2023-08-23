import { useState, useEffect, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { axios } from '../../../utils/axiosConfig'
import { todoState, incompleteTodoListState } from '../../../stores/todoState'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import { errorToast } from '../../../utils/errorToast'

import styles from './index.module.css'

export const Top = () => {
  // const [todos, setTodos] = useState([])
  const [editTodoId, setEditTodoId] = useState('')
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
 
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
// Todoの新規追加
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault() // デフォルトのイベントであるページ遷移をキャンセル
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // console.log(data)
        setTodos((prevTodos) => [...prevTodos, data]);
        setInputValues({
          title: '',
          description: '',
        });
        setIsAddTaskFormOpen(false);
      })
      .catch((error) => {
        errorToast(error.message)
      })
    },
    [setTodos, inputValues]
  )
  // 編集する
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault() // デフォルトのイベントであるページ遷移をキャンセル
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues).then(({ data }) => {
          // console.log(data)
          setInputValues({
            title: '',
            description: '',
          });
          // ここに更新した時に全取得するコードを書いてほしい
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
  // 削除の操作
  const handleDeleteButtonClick = useCallback(
    (id) => {
      axios.delete(`http://localhost:3000/todo/${id}`, inputValues).then(({ data }) => {
        // console.log(data)
        setTodos(data);
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
  // 完了・未完了の切り替え
  const handleToggleButtonClick = useCallback(
    (id) => {
      console.log(todos, "axiosの前")
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedCompletionStatus = todoToUpdate.isCompleted;

      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: updatedCompletionStatus,
        })
        .then(({ data }) => {
          console.log(data, "thenの中")
          const updatedTodos = todos.map((todo) =>
          // ここ↓を短縮して書きたい
          todo.id === data.id ? data:todo);
          setTodos(updatedTodos); // stateを更新
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
    [todos, setTodos]
  )
    // Todoの一覧を表示
  useEffect(() => {
    axios.get('http://localhost:3000/todo', inputValues).then(({ data }) => {
      setTodos(data);
      // console.log(data);
    })
    .catch((error) => {
      errorToast(error.message)
    })
  }, [setTodos]);

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
                editTodoId={editTodoId} //これで保存と追加の出しわけ
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
  );
};
