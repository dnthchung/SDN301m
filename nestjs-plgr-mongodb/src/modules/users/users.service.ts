import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/userSetting.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel('UserSettings') private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newUserSettings = new this.userSettingsModel(settings);
      const saveNewSettings = await newUserSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: saveNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUsers() {
    return this.userModel.find().populate('settings').populate('postNe');
  }

  getUserById(id: string) {
    const userFound = this.userModel.findById(id).populate('settings');

    return userFound;
  }

  async updateUserById(id: string, body: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }
}
