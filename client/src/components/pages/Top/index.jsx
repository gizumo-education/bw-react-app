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
  // editTodoId:編集ボタンがクリックされた時に編集するToDoのidを格納
  const [editTodoId, setEditTodoId] = useState('')

    // ↓ inputValuesというstateを追加 ↓
    const [inputValues, setInputValues] = useState({
      title: '',  // タスク名
      description: '',  // タスクの説明
    })

    const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false) // 追加フォームの表示・非表示を管理するためのstate

    // タスクを追加」ボタンをクリックした時に実行するhandleAddTaskButtonClick関数
    const handleAddTaskButtonClick = useCallback(() => {
      // ToDoの追加フォームを開いた時にinputValuesに空文字を格納する
      setInputValues({ title: '', description: '' })
      // ToDoの追加フォームを表示するボタンをクリックした時に、editTodoIdに空文字を格納し、ToDoの編集フォームを非表示にする
      setEditTodoId('')
      setIsAddTaskFormOpen(true)
    }, [])

    // ↓ キャンセルボタンをクリックした時にisAddTaskFormOpenの値をfalseに更新
    const handleCancelButtonClick = useCallback(() => {
      // 編集フォームの「キャンセル」ボタンをクリックした時に、editTodoIdに空文字を格納することで、先ほど追加したif文の条件に一致しなくなり、編集フォームが非表示になる
      setEditTodoId('')
      setIsAddTaskFormOpen(false)
    }, [])

    // handleInputChange関数は、引数にeventを受け取り、event.targetからnameとvalueを取得しています。
    // event.targetからnameとvalueを取得して、setInputValues関数を使ってinputValuesの値を更新しています。
    const handleInputChange = useCallback((event) => {
      const { name, value } = event.target // event.target - イベントが発生した要素を取得できるオブジェクト
      setInputValues((prev) => ({ ...prev, [name]: value }))
    }, [])

    // 追加ボタン
    // 引数にeventを受け取り、event.preventDefault()でformタグのデフォルトのイベントであるページ遷移をキャンセルしている
    // axiosを使用してAPI通信を行いToDoを追加。axiosのpostメソッドの第一引数にはAPIのURLを指定し、第二引数には送信するデータを指定。
    const handleCreateTodoSubmit = useCallback(
      (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
          // console.log(data)

          // 問:API通信が成功した場合、追加したToDoが一覧に表示されるようにしてください
          // todosは配列、dataは配列でない。だからtodosを展開してdataを配列に入れる。
          setTodos([...todos,data])

          // 問:API通信が成功した場合、ToDoの追加フォームを非表示にしてください
          setIsAddTaskFormOpen(false)

          // 問:API通信が成功した場合、ToDoの追加フォームの入力欄を空にしてください
          setInputValues({
            title: '',
            description: '',
          });
        })
      },
      [inputValues]
    )

    // 編集保存ボタン
    // handleEditedTodoSubmit関数は引数にeventを受け取り、event.preventDefault()でformタグのデフォルトのイベントであるページ遷移をキャンセルしています。
    // その後、axiosを使用してAPI通信を行い、ToDoのタイトルと説明を更新しています。
    // axiosのpatchメソッドの第一引数にはAPIのURLを指定し、第二引数には送信するデータを指定します。
    // API通信が成功した場合は、APIからのレスポンスをコンソールに出力しています。
    const handleEditedTodoSubmit = useCallback(
      (event) => {
        event.preventDefault()
        axios
          .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
          .then(({ data }) => {
            // console.log(data)
            // console.log(todos)

            // 問:ToDoの編集が成功した場合、編集したToDoのタイトルと説明をToDoの一覧に反映させてください
            // todosには編集前一覧の配列が入っている。
            // valにはdataには
            setTodos(todos.map(val =>
              val.id === data.id ? data : val
            ))
            // console.log(setTodos)

            // 繰り返し処理したい配列.map(コールバック関数);
            // 条件式 ? trueの時の処理 : falseの時の処理
            // 全体.古いID === 更新.新ID ? 更新ID : 古いID
            // console.log(val)
            
            // 問:ToDoの編集が成功した場合、ToDoの編集フォームを非表示にしてください
            setEditTodoId('')
          })
      },
      [editTodoId, inputValues]
    )

    // ↓ editTodoIdに編集するToDoのidを格納
    // ToDoの編集フォームを表示するボタン
    const handleEditButtonClick = useCallback(
      (id) => {
        // ToDoの編集フォームを表示するボタンをクリックした時に、isAddTaskFormOpenをfalseに変更し、ToDoの追加フォームを非表示にする
        setIsAddTaskFormOpen(false)
        setEditTodoId(id)
        // ↓ 編集ボタンがクリックされた時に、todosに格納されたToDoの中から、編集するToDoのidと一致するToDoをArrayメソッドのfind()を使用して取得し、inputValuesに格納しています。
        // これで、ToDoの編集フォームを開いた時に、フォームに編集するToDoのタイトルと説明が表示されるようになりました。
        const targetTodo = todos.find((todo) => todo.id === id)
        setInputValues({
          title: targetTodo.title,
          description: targetTodo.description,
        })
      },
      [todos] // 依存配列にtodosを追加。つまり、、？
    )

    // 削除ボタン
    // handleDeleteButtonClick関数は、引数に削除するToDoのidを受け取ります。
    // 問:handleDeleteButtonClick関数の中身の処理を書いてToDoの削除機能を完成させてください。
    const handleDeleteButtonClick = useCallback((id) => {
      axios.delete(`http://localhost:3000/todo/${id}`, inputValues).then(({ data }) => {
        // console.log(setTodos)
        // console.log(data)
        // console.log(todos)
        setTodos(data)
        console.log(data)
      })
    },
    []
  )
    useEffect(() => {
      axios.get('http://localhost:3000/todo').then(({ data }) => {
        // console.log(data)
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
                  editTodoId={editTodoId} // 追加
                  onChange={handleInputChange}
                  onCancelClick={handleCancelButtonClick}
                  onSubmit={handleEditedTodoSubmit} // 追加
                />
              </li>
            )
          }
          return(
            <ListItem
              key={todo.id}
              todo={todo}
              // 編集ボタンがクリックされた時に、handleEditButtonClick関数が実行され、editTodoIdに編集するToDoのidを格納できるようになりました。
              onEditButtonClick={handleEditButtonClick}
              onDeleteButtonClick={handleDeleteButtonClick} // 削除
            />
          )
        })}

        {/* ↓タスクを追加ボタン↓ */}
        <li>
          {/* 三項演算子 */}
          {/* true:ToDoの追加フォームを表示。false:「タスクを追加」ボタンを表示 */}
          {/* キャンセルボタンをクリックした時にisAddTaskFormOpenの値をfalseに更新する処理 */}
          {isAddTaskFormOpen ? (
            <Form
              value={inputValues}
              onChange={handleInputChange} // 引数にeventを受け取り、event.targetからnameとvalueを取得
              onCancelClick={handleCancelButtonClick}
              onSubmit={handleCreateTodoSubmit} // 
            />
          ) : (
              <Button
                buttonStyle='indigo-blue'
                onClick={handleAddTaskButtonClick} // 「タスクを追加」ボタンをクリックした時にisAddTaskFormOpenの値をtrueに更新する処理
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
        {/* ↑タスクを追加ボタン↑ */}
      </ul>
    </Layout>
  )
}