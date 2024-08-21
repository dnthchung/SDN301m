import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie } from "src/schemas/movie.schema";
import { CreateMovieDto } from "./dtos/createMovie.dto";

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  //get all movies
  async getAllMovies() {
    return await this.movieModel.find();
  }

  //Q1 : create new movie
  async createMovie(movieIP: CreateMovieDto) {
    // console.log(movieIP);
    const newMovie = new this.movieModel(movieIP);
    return await newMovie.save();
  }
}
