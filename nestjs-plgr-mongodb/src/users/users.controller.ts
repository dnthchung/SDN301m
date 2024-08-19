import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  //readonly ? means that the property can only be initialized once, either in the constructor or at the declaration.
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDtoIP: CreateUserDto) {
    return this.usersService.createUser(createUserDtoIP);
  }
}
