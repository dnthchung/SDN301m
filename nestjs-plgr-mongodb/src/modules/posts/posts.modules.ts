import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    //1. import mongoose module
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    //2. import posts controller
    PostsController,
  ],
  providers: [
    //3. import posts service
    PostsService,
  ],
})
export class PostsModule {}
