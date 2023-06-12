import { Module } from '@nestjs/common'
import { TodoController } from './domains/todo/todo.controller'
import { TodoService } from './domains/todo/todo.service'

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
