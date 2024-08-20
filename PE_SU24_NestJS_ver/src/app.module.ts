import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SDN301_SU24_B1_NESTJS'),
  ],
})
export class AppModule {}
