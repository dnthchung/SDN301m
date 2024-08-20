import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class PostsService {
  //1. create constructor
  constructor(
    //2. inject model
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  getPosts() {
    return 'All posts';
  }

  async createPost({ userId, ...createPostIP }: CreatePostDto) {
    // async createPost(createPostIP: CreatePostDto) {
    //   const { userId } = createPostIP;
    // console.log('userId', userId);
    const userFound = await this.userModel.findById(userId);
    if (!userFound) {
      throw new HttpException('User not found!!!!', HttpStatus.NOT_FOUND);
    }
    // console.log('userFound', userFound);

    const newPost = new this.postModel(createPostIP);
    const savePost = await newPost.save();

    await userFound.updateOne({
      $push: {
        postNe: savePost._id,
      },
    });
    // await this.userModel.findByIdAndUpdate(
    //   userId,
    //   {
    //     $push: { postNe: savePost._id },
    //   },
    //   { new: true }, // This option returns the updated document
    // );

    return userFound;
  }

  findPostById() {
    return 'Find post by id';
  }
}
