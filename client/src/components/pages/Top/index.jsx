import { useState, useEffect, useCallback } from 'react' // useStateを追加
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem' // 追加

import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import styles from './index.module.css'
import { object } from 'prop-types'

//TopのList
export const Top = () => {
  //setTodosは
  const [todos, setTodos] = useState([])
  const [editTodoId, setEditTodoId] = useState('')
  //editTodoIdには、編集ボタンがクリックされた時に編集するToDoのidを格納します。

  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })

  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  //「タスクを追加」ボタンをクリックした時に実行する関数
  const handleAddTaskButtonClick = useCallback(() => {
    //ToDoのタイトルと説明が表示させなくする。
    setInputValues({ title: '', description: '' })
    setEditTodoId('')
    setIsAddTaskFormOpen(true)
  }, [])

  // ToDoの追加フォームを非表示にする処理
  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('')
    setIsAddTaskFormOpen(false)
  }, [])

  //ToDoのタイトルと説明の入力欄に入力した値をstateのinputValuesに反映する処理
  //event.targetは、イベントが発生した要素を取得できるオブジェクト
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  //handleCreateToDoSubmit関数は引数にeventを受け取り、event.preventDefault()で
  //formタグのデフォルトのイベントであるページ遷移をキャンセルしています。
  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        console.log(data)//オブジェクト型
        //追加
        //(今あるtodo+新しいtodo)
        //setTodos([...todos, ...data]);
        //スプレット構文を使用して配列の末尾に要素を追加
        setTodos((prevTodos) => [...prevTodos, data])
        //フォームを非表示にする
        setIsAddTaskFormOpen(null)
        //フォームの中を空白にする。
        //中は配列なので配列内をnullと指定してあげる(この[]がないと全部NULLとなる)
        setInputValues([null])
      })
    }, [inputValues])


  //編集機能の実装
  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.patch(`http://localhost:3000/todo/${editTodoId}`, inputValues).then(({ data }) => {
        console.log(data)//オブジェクト型 編集して更新したデータが入っている

        //まず、IDが一致しているかのチェック
        //してた場合の処理を記載
        //変更されたIDを探して取得する
        setTodos(
          //prevTodosには前のデータを
          (prevTodos) => prevTodos.map((val) =>
            //変更前・変更後のIDを比較⇒その後三項演算子で実行
            val.id === editTodoId ? data : val
          ),
          setEditTodoId('')
        )
      })
    },
    [editTodoId, inputValues]
  )

  //ToDoのidを格納できる
  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false)
    setEditTodoId(id)
    const targetTodo = todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  }, [todos])


  //削除機能の実装
  const handleDeleteButtonClick = useCallback((id) => {
    axios.delete(`http://localhost:3000/todo/${id}`).then(({ data }) => {
      console.log(data)
      setTodos(
        data
      )

  })
  }, [])


  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      console.log(data)
      setTodos(data);//問一の追加
    })
  }, [])

  return (
    <Layout>
      <h1 className={styles.heading}>ToDo一覧</h1>
      <ul className={styles.list}>
        {todos.map((todo) => {
          // ↓ 追加 16section
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
            />
          )
        })}
        {/* mapメソッドは配列にしか使えないためエラーになって真っ白になった */}

        <li>
          {/* trueの場合はToDoの追加フォームを表示し、falseの場合は「タスクを追加」ボタンを表示 */}
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