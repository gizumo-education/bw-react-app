import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([])
  const [editTodoId, setEditTodoId] = useState('')
  // console.log(editTodoId);
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({titele:'', description:''})
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

  const handleCreateTodoSubmit = useCallback((event) => {
    event.preventDefault()
    axios
      .post('http://localhost:3000/todo', inputValues)
      .then(({ data }) => {
      // console.log(data)
      setTodos([...todos, data]) //todosに追加したdataをふくめて渡す
      setIsAddTaskFormOpen(false)
      setInputValues({
        title: '',
        description: '',
      })
    })
  }, [inputValues])

  const handleEditedTodoSubmit = useCallback((event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
          // この時点でサーバー側は変更される
        .then(({ data }) => {
          // console.log(data)
          const newtodo = todos.map(todo => data.id === todo.id ? data : todo) //アロー関数＋三項演算子
            // dataは更新する内容の情報
            // 元からある情報のIDと変えるべき情報のIDが一致した際
              // return data
            // 更新するdataを返す。
            // return todo
              // 一致しない場合はもとからあるtodoを返す
          // newtodoを新しく定義する
          // setTodosで先ほど定義したnewtodoを使用すし更新する(再レンダ)
          // setEditTodoIdはidが一致しなければいいので空文字を入力して削除している
        setTodos(newtodo)
        setEditTodoId('')
      })
    }, [editTodoId, inputValues])

  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])

  const handleDeleteButtonClick = useCallback((id) => {
    axios
      .delete(`http://localhost:3000/todo/${id}`)
      // console.log(id)
      .then(({ data }) => {
        console.log(data)
        setTodos(data)
      })
    // 消去するidを取得
    // 該当するdataを消去
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3000/todo')
      .then(({ data }) => {
      // console.log(data)
      setTodos(data)
    })
  }, [])

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


  // Section16
  // 編集ボタンがクリックされた時に、handleEditButtonClick関数が実行され、
  // editTodoIdに編集するToDoのidを格納できるようになりました。
  // 次に、editTodoIdに格納されたToDoのidと、
  // 表示されているToDoのidが一致するかどうかで、編集フォームの表示・非表示を切り替えていきましょう。
  // if文でeditTodoIdに格納されたToDoのidとtodosに格納されたToDoのidが一致するかどうかを判定し、
  // 一致する場合は編集フォームを表示するようにしています。
  // 次にToDoの追加フォームと編集フォームの表示を切り替える処理を実装していきましょう。

  // 一致するしないの判定は理解。
  // そのあとの表示するしないの表示処理および追加と編集の表示を切り替える処理の実装部分の理解ができていない。
  // フックの動きの理解がたりていない

