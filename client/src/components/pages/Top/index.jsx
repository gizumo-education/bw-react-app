import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button' // 追加
import { Icon } from '../../ui/Icon' // 追加
import { Form } from '../../ui/Form' // 追加


import { useState, useEffect, useCallback } from 'react' // 追加
import { axios } from '../../../utils/axiosConfig'
import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])
  const [editTodoId, setEditTodoId] = useState('')
  // 編集ボタン用usestate
  const [inputValues, setInputValues] = useState({
    title: '',
    // タスク名
    description: '',
    // タスクの説明
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  // 追加フォーム表示、非表示切り替え用 state タスクを追加ボタン
  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' }) // 追加
    setEditTodoId('') // 追加
    setIsAddTaskFormOpen(true)
    // タスクを追加ボタンをクリックした際にtrueをsetIsAddTaskFormOpen返す
  }, [])

  // ↓ 追加
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('') // 追加
    setIsAddTaskFormOpen(false)
    // キャンセルボタンをクリックしたときにfalseを返しフォームを閉じる
  }, [])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    //event.targetから分割代入
    setInputValues((prev) => ({ ...prev, [name]: value }))
    //前の状態をコピーしてname：value,を追加してイベントハンドラ関数に返してる
  }, [])

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      // フォームの送信をキャンセル
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        axios.get('http://localhost:3000/todo').then(({ data }) => {
          // API通信でTodoデータ引っ張り
          console.log(data)
          // todoデータ(配列*オブジェクト)をコンソールに表示
          setTodos(data)
          setIsAddTaskFormOpen(false)
          setInputValues('')
        })
      })
    },
    [inputValues]
  )

  // ↓ 追加
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          console.log(data)
          setEditTodoId('')
          axios.get(`http://localhost:3000/todo`).then(({ data }) => {
            // API通信でTodoデータ引っ張り
            console.log(data)
            // todoデータ(配列*オブジェクト)をコンソールに表示
            setTodos(data)
          })
        })

    },
    [editTodoId, inputValues]
  )

  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false) // 追加
    setEditTodoId(id)
    //編集ボタンクリック時に、handleEditButtonClick関数がeditTodoIdに編集するToDoのidを格納
    // ↓ 追加
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
    // ↑ 追加
  }, [todos])



  const handleDeleteButtonClick = useCallback((id) => {
    const responseDel = axios.delete(`http://localhost:3000/todo/${id}`)
    console.log(responseDel)
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // API通信でTodoデータ引っ張り
      console.log(data)
      // todoデータ(配列*オブジェクト)をコンソールに表示
      setTodos(data)
    })
  }, [])

  const handleToggleButtonClick = useCallback(
    (id) => {
      axios
        .patch(`http://localhost:3000/todo/${id}/completion-status`, {
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        })
        .then(({ data }) => {
          console.log(data)
          const newTodos = todos.map(item => {
            if(item.id === data.id) {
              return {...item, isCompleted : item.isCompleted ? false : true }
            }else {
              return item
            }
          })
          setTodos(newTodos)
        })
        
    },
    [todos]
  )


  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      // API通信でTodoデータ引っ張り
      console.log(data)
      // todoデータ(配列*オブジェクト)をコンソールに表示
      setTodos(data)
    })
  }, [])



  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // ↓ 追加
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
          // ↑ 追加
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
            <Button buttonStyle='indigo-blue'
              onClick={handleAddTaskButtonClick}
              // タスクを追加ボタンクリック時イベント
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
