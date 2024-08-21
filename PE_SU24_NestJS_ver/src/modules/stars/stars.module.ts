import { Module } from '@nestjs/common';
import { StarsController } from './stars.controller';
import { StarsService } from './stars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Star, StarSchema } from 'src/schemas/star.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Star.name,
        schema: StarSchema,
      },
    ]),
  ],
  controllers: [StarsController],
  providers: [StarsService],
})
export class StarsModule {}
