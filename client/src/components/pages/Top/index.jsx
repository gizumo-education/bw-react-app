import { useState,useEffect,useCallback } from 'react' // 追加
import { useRecoilValue, useSetRecoilState } from 'recoil' 
import { axios } from '../../../utils/axiosConfig' // 追加
import { todoState, incompleteTodoListState } from '../../../stores/todoState'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'
import { errorToast } from '../../../utils/errorToast'

import styles from './index.module.css'
import { array } from 'prop-types'

export const Top = () => {
  const todos = useRecoilValue(incompleteTodoListState)
  const setTodos = useSetRecoilState(todoState)
  const [editTodoId, setEditTodoId] = useState('')
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  })
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)
  
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

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        setTodos([...todos, data])
      })
      .catch((error) => {
        errorToast(error.message)
      })
    },
    [setTodos,inputValues]
  )

  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          // console.log(data)
          //mapメソッドを使って編集対象のTODOを更新されたToDoに置き換える
          // 1. mapメソッドを使ってもともとのTODOの配列を一つ一つ繰り返す
          // 2. 1つ1つをチェックして、編集対象のものに当たった時にという条件式を書く
          // 3. 2の条件式でtrueになったときそのTODOを更新されたToDoに置き換える
          const newArray = todos.map((todo) => {
            if (editTodoId === todo.id){
              return data
            }
            return todo
          })
          setTodos(newArray)
          setEditTodoId(undefined)
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
    [setTodos,editTodoId, inputValues]
  )

  const handleEditButtonClick = useCallback((id) => {
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

 const handleDeleteButtonClick = useCallback((id) => {
  console.log(id)
  
  //ここに処理を書いてゴミ箱の機能を実装する//
  //1.APIリクエスト先はhttp://localhost:3000/todo/{id}
  //2.{id}は削除するToDoのid//
  //3.HTTPメソッドはDELETEを使用する//
  axios.delete(`http://localhost:3000/todo/${id}`).then(({ data }) => {
    console.log(data)
    setTodos(data)
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

 const handleToggleButtonClick = useCallback(
  (id) => {
    //ここに処理を書いて実装
    // 1. mapメソッドを使ってもともとのTODOの配列を一つ一つ繰り返す///
    //2. 1つ1つをチェックして、編集対象のものに当たった時にという条件式を書く
    // 3. 2の条件式でtrueになったときそのTODOを更新されたToDoに置き換える//
    //4.クリックした時に切り替わるような処理を書く//

    axios
      .patch(`http://localhost:3000/todo/${id}/completion-status`, {
        isCompleted: todos.find((todo) => todo.id === id).isCompleted,
      })
      .then(({ data }) => {
        console.log(data)
        const newTodoList = todos.map((todo) => {
          if(id === todo.id) {
            return data
          }else{
            return todo
          }
        })
        setTodos(newTodoList)
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
  [todos,setTodos]
)
 
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({data}) => {
      console.log(data)
      setTodos(data)
    })
    .catch((error) => {
      errorToast(error.message)
    })
  }, [setTodos])

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
                  onToggleButtonClick={handleToggleButtonClick}
                />
              </li>
            )
          }
          return <ListItem key={todo.id} todo={todo} onEditButtonClick={handleEditButtonClick} onDeleteButtonClick={handleDeleteButtonClick} onToggleButtonClick={handleToggleButtonClick}/>
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