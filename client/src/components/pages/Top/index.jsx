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
  // todosはToDoの一覧を管理するためのstateなので、初期値は空の配列
  // const [todos, setTodos] = useState([])
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
  const [editTodoId, setEditTodoId] = useState('')
  const [inputValues, setInputValues] = useState({
    // inputValuesのtitleでタスク名、descriptionでタスクの説明を保持して、ToDoの追加時に使用
    title: '',
    description: '',
  })
  // 追加フォームの表示・非表示を管理するためのstate
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // 「タスクを追加」ボタンをクリックした時に実行するhandleAddTaskButtonClick関数
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  // キャンセルボタンをクリックした時に実行するhandleCancelButtonClick関数
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  // handleInputChange関数は、引数にeventを受け取り、event.targetからnameとvalueを取得しています。
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Todoの追加
  // handleCreateToDoSubmit関数は引数にeventを受け取り、event.preventDefault()でformタグのデフォルトのイベントであるページ遷移をキャンセルしています
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      // axiosのpostメソッドの第一引数にはAPIのURLを指定し、第二引数には送信するデータを指定します
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // 新しいToDoを追加
        // 返り値に新しいTodoのデータを加える
        setTodos((prevTodos) => [...prevTodos, data]);
        // ToDoフォームを非表示
        setIsAddTaskFormOpen(false);
        // 入力値クリア
        setInputValues({
          title: '',
          description: '',
        });
      }).catch((error) => {
        errorToast(error.message)
      })
    },
    [setTodos, inputValues]
  )
  // 編集機能の実装
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.patch(`http://localhost:3000/todo/${editTodoId}`, inputValues).then(({ data }) => {
        // setTodosの引数として関数を渡しています。この関数の引数prevTodosは、現在のToDoリストの状態を表す。
        // prevTodos は Reactコンポーネント内で状態の前回の値の状態を参照するために使用される変数
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            if (todo.id === editTodoId) {
              // スプレッド演算子{ ...todo }で元の情報をコピーし、titleとdescriptionをinputValuesの対応する値で更新
              return { ...todo, title: inputValues.title, description: inputValues.description };
            } else {
              // 一致しない場合、元のToDoの情報を返す
              return todo;
            }
          });
        });
        // 編集フォームの非表示 EditTodoIdに空文字を格納し、ToDoの編集フォームを非表示にする
        setEditTodoId('')
        console.log(data)

        // エラーメッセージ
      }).catch((error) => {
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
  // 編集ボタンがクリックされた時に、handleEditButtonClick関数が実行され、editTodoIdに編集するToDoのidを格納する。
  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)
    // 編集ボタンがクリックされた時に、todosに格納されたToDoの中から、編集するToDoのidと一致するToDoをArrayメソッドのfind()を使用して取得し、inputValuesに格納する。
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])

  // ToDoの削除
  const handleDeleteButtonClick = useCallback((id) => {
    axios.delete(`http://localhost:3000/todo/${id}`).then((response) => {
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id))
      console.log(response)
    }).catch((error) => {
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

  // ToDoの完了・未完了切り替え機能の実装
  const handleToggleButtonClick = useCallback((id) => {
    axios.patch(`http://localhost:3000/todo/${id}/completion-status`, {
      isCompleted: todos.find((todo) => todo.id === id).isCompleted,
    }).then(({ data }) => {
      setTodos((prevTodos) => prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ))
      console.log(data)
    }).catch((error) => {
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
  }, [todos, setTodos]
  )

  useEffect(() => {
    // API通信が成功した場合は、取得したToDoの一覧をコンソールに出力。
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // Todoの一覧表示
      setTodos(data)
      console.log(data)
    }).catch((error) => {
      errorToast(error.message)
    })
  }, [setTodos])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // editTodoIdに格納されたToDoのidとtodosに格納されたToDoのidが一致するかどうかを判定し、一致する場合は編集フォームを表示するように
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
            <Form value={inputValues} onChange={handleInputChange} onCancelClick={handleCancelButtonClick} onSubmit={handleCreateTodoSubmit} />
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
