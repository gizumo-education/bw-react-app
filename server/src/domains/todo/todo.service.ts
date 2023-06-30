import * as fs from 'fs'
import * as path from 'path'
import { nanoid } from 'nanoid'
import { Injectable } from '@nestjs/common'
import type { Todo, TodoSaveSeed } from '../../models/todo/type'

const todosJsonPath: string =
  path && path.join(__dirname, '../../data/todos.json')

@Injectable()
export class TodoService {
  getTodos(): Todo[] {
    const todos = fs.readFileSync(todosJsonPath, 'utf8')
    return JSON.parse(todos)
  }

  createTodo({ title, description }: TodoSaveSeed): Todo {
    const todos = this.getTodos()
    if (!title) {
      throw new Error(
        'タイトルが入力されていません。タスクを追加するには1文字以上のタイトルを入力してください。'
      )
    }
    const newTodo = {
      id: nanoid(),
      title,
      description,
      isCompleted: false,
    }
    todos.push(newTodo)
    fs.writeFileSync(todosJsonPath, JSON.stringify(todos))
    return newTodo
  }

  updateTodo(id: string, { title, description }: TodoSaveSeed): Todo {
    const todos = this.getTodos()
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex < 0) {
      throw new Error('更新するTodoのidが見つかりませんでした。')
    }
    const updatedTodo = {
      id,
      title,
      description,
      isCompleted: todos[todoIndex].isCompleted,
    }
    todos[todoIndex] = updatedTodo
    fs.writeFileSync(todosJsonPath, JSON.stringify(todos))
    return updatedTodo
  }

  updateCompletionStatus(id: string, isCompleted: boolean): Todo {
    const todos = this.getTodos()
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex < 0) {
      throw new Error(
        '完了・未完了を切り替えるTodoのidが見つかりませんでした。'
      )
    }
    const updatedTodo = {
      ...todos[todoIndex],
      isCompleted: !isCompleted,
    }
    todos[todoIndex] = updatedTodo
    fs.writeFileSync(todosJsonPath, JSON.stringify(todos))
    return updatedTodo
  }

  deleteTodo(id: string): Todo[] {
    const todos = this.getTodos()
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex < 0) {
      throw new Error('削除するTodoのidが見つかりませんでした。')
    }
    todos.splice(todoIndex, 1)
    fs.writeFileSync(todosJsonPath, JSON.stringify(todos))
    return todos
  }
}
