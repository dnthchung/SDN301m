import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Movie, MovieDocument } from "src/schemas/movie.schema";
import { CreateMovieDto } from "./dtos/createMovie.dto";
import { GetAllMoviesDto } from "./dtos/getAllMovies.dto";

//movie.service.ts
@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async getAllMovies(): Promise<GetAllMoviesDto[]> {
    const moviesFound = await this.movieModel
      .find()
      .populate({ path: "producer", select: "name" }) // Populating producer's name
      .populate({ path: "director", select: "fullname" }) // Populating director's fullname
      .populate({ path: "stars", select: "fullname" }); // Populating stars' fullnames

    // Map the movies to the DTO structure
    return moviesFound.map((movie) => {
      return {
        _id: movie._id.toString(), // Convert ObjectId to string
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: (movie.producer as any)?.name ?? null, // Type assertion to access `name`
        director: (movie.director as any)?.fullname ?? null, // Type assertion to access `fullname`
        genres: movie.genres,
        stars: (movie.stars as any[]).map((star) => star.fullname), // Type assertion for stars
      };
    });
  }

  async createMovie(movieIP: CreateMovieDto): Promise<Movie> {
    const newMovie = new this.movieModel(movieIP);
    return await newMovie.save();
  }

  async getAllMoviesByGenre(genreIP: string): Promise<GetAllMoviesDto[]> {
    const moviesFound = await this.movieModel
      .find({ genres: genreIP })
      .populate({ path: "producer", select: "name" })
      .populate({ path: "director", select: "fullname" })
      .populate({ path: "stars", select: "fullname" });

    const finalDate = moviesFound.map((movie) => {
      return {
        _id: movie._id.toString(),
        title: movie.title,
        release: movie.release,
        description: movie.description,
        producer: (movie.producer as any)?.name ?? null,
        director: (movie.director as any)?.fullname ?? null,
        genres: movie.genres,
        stars: (movie.stars as any[]).map((star) => star.fullname),
      };
    });
    return finalDate;
  }
}
