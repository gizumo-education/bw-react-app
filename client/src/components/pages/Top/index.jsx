import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'
import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import styles from './index.module.css'

export const Top = () => {
  // ---- state ----
  // Todo情報の保持、更新
  const [todos, setTodos] = useState([])
  // 入力値の保持、更新
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  }) // useStateの引数は初期値
  // 編集対象のTodo記事のIDの保持、更新
  const [editTodoId, setEditTodoId] = useState('')
  // 追加フォーム表示・非表示の切り替え
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  // 追加ボタン／キャンセルボタンをクリックした時のtrue/false切り替えの処理
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' }) // ToDoのタイトルと説明を空にする
    setEditTodoId('') // editTodoIdに空文字を格納（編集フォーム非表示にするため）
    setIsAddTaskFormOpen(true)
  }, [])
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('') // editTodoIdに空文字を格納（編集フォーム非表示にするため）
    setIsAddTaskFormOpen(false)
  }, [])

  // 入力内容を反映する処理
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target // 分割代入。nameには入力されたname属性が入り、valueにはその内容が入る
    // console.log('name:', name, 'value:', value)
    setInputValues((prev) => ({ ...prev, [name]: value })) // スプレッド構文
  }, [])

  // Submitボタンを押した時の処理
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .post('http://localhost:3000/todo', inputValues)
        .then(({ data }) => {
          console.log(data);
          // setInputValues({title: '', description: ''}) // ToDoの追加フォームの入力欄を空にする
          setIsAddTaskFormOpen(false) // ToDoの追加フォームを非表示にする
          // setTodos({}) // 更新関数を動かしてあげないと再レンダリングされないが、useEffectでtodosを監視しているので不要
        })
    },
    [inputValues]
  )

  // 編集ボタンを押した時の処理
  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false) // ToDoの追加フォーム非表示（ToDoの追加フォームと編集フォームを同時に表示しない）
    setEditTodoId(id)
    const targetTodo = todos.find((todo) => todo.id === id)
    // console.log(targetTodo);
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])

  // Todo編集→保存ボタンを押した時の処理
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          // console.log(data)
          setInputValues({
            title: data.title,
            description: data.description,
          })
          handleCancelButtonClick();
          setEditTodoId('');
        })
    },
    [editTodoId, inputValues]
  )

  // 削除ボタン押した時の処理
  const handleDeleteButtonClick = useCallback((id) => {
    axios
        .delete(`http://localhost:3000/todo/${id}`)
        .then(({ data }) => {
          // [sec17]Q: APIからのレスポンスが確認できたら、APIからのレスポンスをToDoの一覧を管理しているstateに反映させましょう
          console.log(data);// 削除後の配列
        })
  }, [])

  // チェックボックス押した時の完了・未完了の切り替え処理
  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          // [sec18]Q: ToDoの完了・未完了の切り替えが成功した場合、切り替え後のToDoの完了・未完了の状態を画面に反映させてください。
          console.log(data)
        })
    },
    [todos]
  )
  


  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // console.log('data:', data) // Todo情報3つ分
      setTodos(data) // 更新関数。useEffectを使っているので、初回レンダリング時に実行される。
    }).catch(({err}) => {
      console.log(err)
    })
  }, [todos]) // 第二引数に依存配列を渡すと、その配列の変更の際にもuseEffect内の処理が実行される

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // console.log('todo:', todo) // Todo情報1つずつ
          // todosに格納されたToDoのidが一致する場合はフォームを表示
          if (editTodoId === todo.id) {
            return (
              <li key={todo.id}>
                <Form
                  value={inputValues}
                  editTodoId={editTodoId} // ToDoの編集フォームが開いているか否かでForm内のボタンを切り替え
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
          {/* trueの場合はToDoの追加フォームを表示し、falseの場合は「タスクを追加」ボタンを表示 */}
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              onChange={handleInputChange}
              onCancelClick={handleCancelButtonClick} // onCancelClickというイベントは、Formコンポーネントのキャンセルボタンに定義
              onSubmit={handleCreateTodoSubmit}
            />
          ) : (
            <Button
              buttonStyle='indigo-blue'
              className={styles['add-task']}
              onClick={handleAddTaskButtonClick} // handleAddTaskButtonClick関数をpropsとして渡す
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
