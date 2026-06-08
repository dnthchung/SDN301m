import { TodoPriority } from 'src/todos/enums/todo-priority.enum';
import { TodoStatus } from 'src/todos/enums/todo-status.enum';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1, { message: 'Title không được để trống' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus, {
    message: `Status phải là một trong: ${Object.values(TodoStatus).join(', ')}`,
  })
  status?: TodoStatus;

  @IsOptional()
  @IsEnum(TodoPriority, {
    message: `Priority phải là một trong: ${Object.values(TodoPriority).join(', ')}`,
  })
  priority?: TodoPriority;

  @IsOptional()
  @IsInt({ message: 'categoryId phải là số nguyên' })
  categoryId?: number;

  @IsInt({ message: 'userId phải là số nguyên' })
  userId: number;
}
