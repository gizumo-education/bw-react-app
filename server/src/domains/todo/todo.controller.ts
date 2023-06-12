import { Body, Controller, Delete, Get, Param, Patch, Post, HttpException, HttpStatus } from '@nestjs/common'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos()
  }

  @Post()
  createTodo(@Body('title') title: string, @Body('description') description: string) {
    try {
      return this.todoService.createTodo({
        title,
        description,
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    try {
      return this.todoService.updateTodo(id, {
        title,
        description,
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    try {
      return this.todoService.deleteTodo(id)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }
}
