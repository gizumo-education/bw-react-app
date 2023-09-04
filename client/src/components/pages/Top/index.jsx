// レンダリングするのを防ぐことができるuseEffect、useState、useCallback
import { useState, useEffect, useCallback } from 'react'

// API取得インポート
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
// APIで取得した、ToDoリスト表示するためのコンポーネント
import { ListItem } from '../../ui/ListItem'

// ボタンのコンポーネント
import { Button } from '../../ui/Button'

// アイコンのコンポーネント
import { Icon } from '../../ui/Icon'

// フォームのコンポーネント
import { Form } from '../../ui/Form'

// エラーハンドリング
import { errorToast } from '../../../utils/errorToast'

// リコイルを使う時の記述
import { useRecoilValue, useSetRecoilState } from 'recoil'

// リコイルの処理を最初の地点を記述したコンポーネント
import { todoState, incompleteTodoListState } from '../../../stores/todoState'

import styles from './index.module.css'

export const Top = () => {
    // const [todos, setTodos] = useState([])
  // ↓ useStateを削除し、Recoilの使用に変更
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
  // ↑ useStateを削除し、Recoilの使用に変更

  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // console.log(data)
      // setTodosの呼び出しでtodosステートにデータをセット
      setTodos(data);
    })
      // 下記APIからレスポンスが返ってこない場合
      .catch((error) => {
        errorToast(error.message)
      })
    // 上記APIからレスポンスが返ってこない場合
  }, [setTodos]);

  const [editTodoId, setEditTodoId] = useState('')

  // 追加機能記述
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  const handleAddTaskButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
    setInputValues({ title: '', description: '' })
  }, [])

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setInputValues({
      title: '',
      description: '',
    });
    setIsAddTaskFormOpen(false)
  }, [])
  // 追加機能ここまで

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  // 新規作成の記述
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        console.log(data)
        setTodos(currentTodos => [...currentTodos, data]); // カレント（現在）トゥードゥス
        setIsAddTaskFormOpen(false);
        setInputValues({
          title: '',
          description: '',
        });
      })
        // APIからレスポンスが返ってこない場合
        .catch((error) => {
          errorToast(error.message)
        });
      // 上記APIからレスポンスが返ってこない場合
    },
    // ↓ setTodosを追加
    [setTodos, inputValues]
  )

  // 編集の記述
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          const updateTodos = todos.map((todo) =>
            todo.id === editTodoId ? data : todo)
          console.log(data)
          setTodos(updateTodos)
          setEditTodoId('');
        })
        // 下記エラーハンドリング追記
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '更新するToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            // 下記APIからレスポンスが返ってこない場合
            default:
              errorToast(error.message)
              break
            // 上記APIからレスポンスが返ってこない場合
          }
        })
      // 上記エラーハンドリング追記
    },
    // ↓ setTodosを追加
    [setTodos, editTodoId, inputValues]
  )

  const handleEditButtonClick = useCallback((id) => {
    const targetTodo = todos.find((todo) => todo.id === id);

    setIsAddTaskFormOpen(false);
    setEditTodoId(id);

    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    });
  }, [todos]);

  // 消去の記述
  const handleDeleteButtonClick = useCallback((id) => {
    axios.delete(`http://localhost:3000/todo/${id}`).then(({ data }) => {
      console.log(data);
      setTodos(data);
    })
      // 下記はエラーハンドリングの追記
      .catch((error) => {
        switch (error.statusCode) {
          case 404:
            errorToast(
              '削除するToDoが見つかりませんでした。画面を更新して再度お試しください。'
            )
            break
          // 下記APIからレスポンスが返ってこない場合
          default:
            errorToast(error.message)
            break
          // 上記APIからレスポンスが返ってこない場合
        }
      })
    // 上記はエラーハンドリングの追記
  },
  // ↓ setTodosを追加
  [setTodos]);

  // 完了未完了の記述
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          console.log(data)
          // 下記追記
          const getCompleted = todos.map((todo) => todo.id === id ? data : todo);
          setTodos(getCompleted);
          // 上記追記
        })
        // 下記はエラーハンドリングの追記
        .catch((error) => {
          switch (error.statusCode) {
            case 404:
              errorToast(
                '削除するToDoが見つかりませんでした。画面を更新して再度お試しください。'
              )
              break
            // 下記APIからレスポンスが返ってこない場合
            default:
              errorToast(error.message)
              break
            // 上記APIからレスポンスが返ってこない場合
          }
        })
      // 上記はエラーハンドリングの追記
    },
    // ↓ setTodosを追加
    [setTodos, todos]
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
              // 編集の記述
              onEditButtonClick={handleEditButtonClick}
              // 消去の記述
              onDeleteButtonClick={handleDeleteButtonClick}
              // 完了未完了の記述
              onToggleButtonClick={handleToggleButtonClick}
            />
          );
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
            <Button buttonStyle='indigo-blue'
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
}
