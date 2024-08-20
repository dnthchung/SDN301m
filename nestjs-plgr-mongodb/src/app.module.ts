import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs1'),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
