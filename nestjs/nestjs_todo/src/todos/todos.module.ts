import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TODOS_CONFIG } from 'src/types/todos';
// import { RequestMiddleware } from 'src/common/middlewares/request-id.middleware';

@Module({
  controllers: [TodosController],
  providers: [
    TodosService,
    {
      provide: TODOS_CONFIG,
      useValue: {
        maxTodosPerUser: 100,
        maxTitleLength: 200,
        defaultPageSize: process.env.NODE_ENV === 'development' ? 10 : 20,
      },
    },
  ],
  imports: [CategoriesModule, UsersModule, TypeOrmModule.forFeature([Todo])],
})
export class TodosModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RequestMiddleware).forRoutes('todos');
  // }
}
