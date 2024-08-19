import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUsers() {
    return this.userModel.find().exec();
  }

  async getUserById(id: string) {
    // console.log('id', id);
    const isValid = mongoose.Types.ObjectId.isValid(id);

    const userFound = await this.userModel.findById(id);
    return userFound;
  }

  async updateUserById(id: string, body: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    // const isValid = mongoose.Types.ObjectId.isValid(id);
    // if (!isValid) {
    //   return 'Invalid id';
    // }
    // const userFound = await this.userModel.findById(id);
    // if (!userFound) {
    //   return 'User not found';
    // }

    // userFound.displayName = body.displayName;
    // userFound.avatarUrl = body.avatarUrl;
    // return userFound.save();
  }
}
