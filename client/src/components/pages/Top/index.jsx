import { useState, useEffect, useCallback } from 'react' // レンダリングするのを防ぐことができるuseEffect、useState、useCallback
import { axios } from '../../../utils/axiosConfig' // API取得インポート

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem' // APIで取得した、3つのToDoを表示するためのコンポーネント

import { Button } from '../../ui/Button' // ボタンのコンポーネント
import { Icon } from '../../ui/Icon' // アイコンのコンポーネント
import { Form } from '../../ui/Form' // フォームのコンポーネント

import styles from './index.module.css'

export const Top = () => {
  useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data); // setTodosの呼び出しでtodosステートにデータをセット
    });
  }, []);

  const [todos, setTodos] = useState([])
  const [editTodoId, setEditTodoId] = useState('')

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

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setInputValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleCreateTodoSubmit = useCallback(
    (event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        console.log(data)
        setTodos(handleInputChange => [...handleInputChange, data]);
        setIsAddTaskFormOpen(false);
        setInputValues({
          title: '',
          description: '',
        });
      });
    },
    [inputValues]
  )

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
          setEditTodoId(false);
        })
    },
    [editTodoId, inputValues]
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
