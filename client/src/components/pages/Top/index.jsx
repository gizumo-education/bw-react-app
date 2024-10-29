// import { useState, useEffect, useCallback } from 'react'
// import { axios } from '../../../utils/axiosConfig'
// import { Layout } from '../../ui/Layout'
// import { ListItem } from '../../ui/ListItem'
// import { Button } from '../../ui/Button'
// import { Icon } from '../../ui/Icon'
// import { Form } from '../../ui/Form'

// import styles from './index.module.css'

// export const Top = () => {
//   const [todos, setTodos] = useState([])

//     // ↓ inputValuesというstateを追加 ↓
//     const [inputValues, setInputValues] = useState({
//       title: '',  // タスク名
//       description: '',  // タスクの説明
//     })
//     // ↑ inputValuesというstateを追加 ↑
//     const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false) // 追加フォームの表示・非表示を管理するためのstate
    
//     // タスクを追加」ボタンをクリックした時に実行するhandleAddTaskButtonClick関数
//     const handleAddTaskButtonClick = useCallback(() => {
//       setIsAddTaskFormOpen(true)
//     }, [])

//     // ↓ キャンセルボタンをクリックした時にisAddTaskFormOpenの値をfalseに更新
//     const handleCancelButtonClick = useCallback(() => {
//       setIsAddTaskFormOpen(false)
//     }, [])


//     // handleInputChange関数は、引数にeventを受け取り、event.targetからnameとvalueを取得しています。
//     // event.targetからnameとvalueを取得して、setInputValues関数を使ってinputValuesの値を更新しています。
//     const handleInputChange = useCallback((event) => {
//       const { name, value } = event.target // event.target - イベントが発生した要素を取得できるオブジェクト
//       setInputValues((prev) => ({ ...prev, [name]: value }))
//     }, [])



//     // 引数にeventを受け取り、event.preventDefault()でformタグのデフォルトのイベントであるページ遷移をキャンセルしている
//     // axiosを使用してAPI通信を行いToDoを追加。axiosのpostメソッドの第一引数にはAPIのURLを指定し、第二引数には送信するデータを指定。
//     const handleCreateTodoSubmit = useCallback(
//       (event) => {
//         event.preventDefault()
//         axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
//           console.log(data)
//         })
//       },
//       [inputValues]
//     )

//     useEffect(() => {
//       axios.get('http://localhost:3000/todo').then(({ data }) => {
//         console.log(data)
//         setTodos(data)
//       })
//     }, [])

//   return (
//     <Layout>
//       <h1 className={styles.heading}>ToDo一覧</h1>
//       <ul className={styles.list}>
//         {todos.map((todo) => {
//           return <ListItem key={todo.id} todo={todo} />
//         })}

//         {/* ↓タスクを追加ボタン↓ */}
//         <li>
//           {/* 三項演算子 */}
//           {/* true:ToDoの追加フォームを表示。false:「タスクを追加」ボタンを表示 */}
//           {/* キャンセルボタンをクリックした時にisAddTaskFormOpenの値をfalseに更新する処理 */}
//           {isAddTaskFormOpen ? (
//             <Form
//               value={inputValues}
//               onChange={handleInputChange} // 引数にeventを受け取り、event.targetからnameとvalueを取得
//               onCancelClick={handleCancelButtonClick}
//               onSubmit={handleCreateTodoSubmit} //
//             />
//           ) : (
//               <Button
//                 buttonStyle='indigo-blue'
//                 onClick={handleAddTaskButtonClick} // 「タスクを追加」ボタンをクリックした時にisAddTaskFormOpenの値をtrueに更新する処理
//                 className={styles['add-task']}
//               >
//               <Icon
//                 iconName='plus'
//                 color='orange'
//                 size='medium'
//                 className={styles['plus-icon']}
//               />
//               タスクを追加
//             </Button>
//           )}
//         </li>
//         {/* ↑タスクを追加ボタン↑ */}
//       </ul>
//     </Layout>
//   )
// }





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

    // ↓ inputValuesというstateを追加 ↓
    const [inputValues, setInputValues] = useState({
      title: '',  // タスク名
      description: '',  // タスクの説明
    })

    const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false) // 追加フォームの表示・非表示を管理するためのstate
    
    // タスクを追加」ボタンをクリックした時に実行するhandleAddTaskButtonClick関数
    const handleAddTaskButtonClick = useCallback(() => {
      setIsAddTaskFormOpen(true)
    }, [])



    // // ↓ API通信が成功した場合、ToDoの追加フォームを非表示にしてください
    // const isAddTaskFormOpen = useCallback(() => {
    //   setIsAddTaskFormOpen(false)
    // }, [])



    // ↓ キャンセルボタンをクリックした時にisAddTaskFormOpenの値をfalseに更新
    const handleCancelButtonClick = useCallback(() => {
      setIsAddTaskFormOpen(false)
    }, [])


    // handleInputChange関数は、引数にeventを受け取り、event.targetからnameとvalueを取得しています。
    // event.targetからnameとvalueを取得して、setInputValues関数を使ってinputValuesの値を更新しています。
    const handleInputChange = useCallback((event) => {
      const { name, value } = event.target // event.target - イベントが発生した要素を取得できるオブジェクト
      setInputValues((prev) => ({ ...prev, [name]: value }))
    }, [])



    // 引数にeventを受け取り、event.preventDefault()でformタグのデフォルトのイベントであるページ遷移をキャンセルしている
    // axiosを使用してAPI通信を行いToDoを追加。axiosのpostメソッドの第一引数にはAPIのURLを指定し、第二引数には送信するデータを指定。
    const handleCreateTodoSubmit = useCallback(
      (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
          // console.log(data)

          // API通信が成功した場合、追加したToDoが一覧に表示されるようにしてください
          setTodos([...todos,data])

          // API通信が成功した場合、ToDoの追加フォームを非表示にしてください
          setIsAddTaskFormOpen(false)

          // API通信が成功した場合、ToDoの追加フォームの入力欄を空にしてください
          setInputValues({
            title: '',
            description: '',
          });
        })
      },
      [inputValues]
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
          return <ListItem key={todo.id} todo={todo} />
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