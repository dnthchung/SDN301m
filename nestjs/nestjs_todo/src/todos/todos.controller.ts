import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QueryParamsDto } from './dto/query-params.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
import { TodoOwnershipGuard } from './guards/todo-ownership.guard';
import { TimingInterceptor } from 'src/common/interceptors/timing.interceptor';
import {
  GROUP_USER_BASIC,
  GROUP_USER_DETAIL,
} from 'src/users/entities/user.entity';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  @UseInterceptors(TimingInterceptor)
  @SerializeOptions({ groups: [GROUP_USER_BASIC] })
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.todosService.findAll(queryParamsDto);
  }

  @Get(':id')
  @SerializeOptions({ groups: [GROUP_USER_DETAIL] })
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findByID(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(TodoOwnershipGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }
}
