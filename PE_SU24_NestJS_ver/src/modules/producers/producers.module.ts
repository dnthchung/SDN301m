import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Producer, ProducerSchema } from 'src/schemas/producer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Producer.name,
        schema: ProducerSchema,
      },
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
