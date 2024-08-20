import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  //1. create constructor
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() createPostIP: CreatePostDto) {
    return this.postsService.createPost(createPostIP);
  }

  @Get()
  getPosts() {
    return 'All posts';
  }

  @Post()
  findPostById() {
    return 'Find post by id';
  }
}
