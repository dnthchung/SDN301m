import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './modules/movies/movies.module';
import { ProducersModule } from './modules/producers/producers.module';
import { StarsModule } from './modules/stars/stars.module';
import { DirectorsModule } from './modules/directors/directors.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SDN301_SU24_B1_NESTJS'),
    MovieModule,
    ProducersModule,
    StarsModule,
    DirectorsModule,
  ],
})
export class AppModule {}
