import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  //readonly ? means that the property can only be initialized once, either in the constructor or at the declaration.
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDtoIP: CreateUserDto) {
    return this.usersService.createUser(createUserDtoIP);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') myIdController: string) {
    // console.log('myIdController', myIdController);
    return this.usersService.getUserById(myIdController);
  }

  @Patch(':id')
  updateUserById(
    @Param('id') myIdController: string,
    @Body() myBodyController: UpdateUserDTO,
  ) {
    return this.usersService.updateUserById(myIdController, myBodyController);
  }
}
