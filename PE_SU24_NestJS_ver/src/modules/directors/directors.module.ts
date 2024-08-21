import { Module } from '@nestjs/common';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from 'src/schemas/director.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Director.name, schema: DirectorSchema },
    ]),
  ],
  controllers: [DirectorsController],
  providers: [DirectorsService],
})
export class DirectorsModule {}
