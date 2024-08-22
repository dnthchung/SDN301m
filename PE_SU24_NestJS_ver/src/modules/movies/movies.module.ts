import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "src/schemas/movie.schema";
import { MovieController } from "./movies.controller";
import { MovieService } from "./movies.service";
import { Producer, ProducerSchema } from "src/schemas/producer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
      {
        name: Producer.name,
        schema: ProducerSchema,
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
