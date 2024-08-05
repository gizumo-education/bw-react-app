import { useState, useEffect, useCallback } from 'react'
import { axios } from '../../../utils/axiosConfig'

import { Layout } from '../../ui/Layout'
import { ListItem } from '../../ui/ListItem'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Form } from '../../ui/Form'

import styles from './index.module.css'

export const Top = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState('');

  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
  });
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

  const handleAddTaskButtonClick = useCallback(() => {
    setInputValues({ title: '', description: '' });
    setEditTodoId('');
    setIsAddTaskFormOpen(true)
  }, []);

  const handleCancelButtonClick = useCallback(() => {
    setEditTodoId('');
    setIsAddTaskFormOpen(false)
  }, []);
  const handleInputChange = useCallback((event) => {
    const { name, value } =event.target;
    setInputValues((prev) => ({ ...prev, [name]: value }))
  },[]);

  const handleCreateTodoSubmit = useCallback((event) => {
      event.preventDefault()
      axios.post('http://localhost:3000/todo', inputValues).then(({ data }) => {
        // console.log(data)
        setTodos((prevTodos) => [ ...prevTodos, data ]);
        setIsAddTaskFormOpen(false);
        setInputValues({
          title: '',
          description: '',
        });
      }).catch(error => {
        console.error('タスクの追加に失敗しました:', error);
      });
    },
    [inputValues]
  );

  const handleEditButtonClick = useCallback((id) => {
    setIsAddTaskFormOpen(false);
    setEditTodoId(id);
    const targetTodo =todos.find((todo) => todo.id === id)
    setInputValues({
      title: targetTodo.title,
      description: targetTodo.description,
    })
  },
  [todos]
);

  const handleEditedTodoSubmit = useCallback(
    (event) => {
      event.preventDefault();
      axios
        .patch(`http://localhost:3000/todo/${editTodoId}`, inputValues)
        .then(({ data }) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === editTodoId ? { ...todo, title: data.title, description: data.description } : todo
            )
          );

        setEditTodoId('');
        setIsAddTaskFormOpen(false)
        setInputValues({
          title: '',
          description: '',
        });
      })
      .catch((error) => {
        console.error('タスクの編集に失敗しました:', error);
      });
    },
    [editTodoId, inputValues]
  );

  const handleDeleteButtonClick = useCallback((id) => {
    axios.delete(`http://localhost:3000/todo/${id}`)
        .then(response => {
          console.log('削除成功:', response.data);
           setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        })
        .catch(error => {
          console.error('削除失敗:', error);
        });
}, []);

const handleToggleButtonClick = useCallback(
  (id) => {
    axios
      .patch(`http://localhost:3000/todo/${id}/completion-status`, {
        isCompleted: todos.find((todo) => todo.id === id).isCompleted,
      })
      .then(({ data }) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: data.isCompleted } : todo
          )
        );
        console.log('切り替え成功', data);
      })
      .catch((error) => {
        console.error('切り替え失敗', error);
      });
  },
  [todos]
);

useEffect(() => {
    axios.get('http://localhost:3000/todo').then(({ data }) => {
      setTodos(data);
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
            onSubmit={handleCreateTodoSubmit} />
        ) : (
          <Button
          buttonStyle='indigo-blue'
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