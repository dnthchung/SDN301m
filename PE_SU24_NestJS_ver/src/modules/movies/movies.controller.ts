import { Body, Controller, Get, Post } from "@nestjs/common";
import { MovieService } from "./movies.service";
import { CreateMovieDto } from "./dtos/createMovie.dto";
import { ResponseData } from "src/common/global/globalClass";
import { Movie } from "src/schemas/movie.schema";
import { HttpMessage, HttpStatusCode } from "src/common/global/globalEnum";
import { GetAllMoviesDto } from "./dtos/getAllMovies.dto";

@Controller("api/movie")
export class MovieController {
  /**
   * 1. create constructor
   * 2. inject service to constructor
   * 3. create method to handle request post / get ... (@Post, @Get, @Put, @Delete)
   */

  constructor(
    // inject service to constructor
    private movieService: MovieService,
  ) {}

  //Q1 : create new movie
  @Post("create")
  async createMovie(@Body() infoIP: CreateMovieDto): Promise<ResponseData<Movie>> {
    // return await this.movieService.createMovie(infoIP);
    try {
      return new ResponseData<Movie>(await this.movieService.createMovie(infoIP), HttpStatusCode.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Movie>(null, HttpStatusCode.ERROR, HttpMessage.ERROR);
    }
  }

  //Q2 : get all movies
  @Get()
  async getAllMovies(): Promise<ResponseData<GetAllMoviesDto[]>> {
    // return await this.movieService.getAllMovies();
    try {
      return new ResponseData<GetAllMoviesDto[]>(await this.movieService.getAllMovies(), HttpStatusCode.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<GetAllMoviesDto[]>([], HttpStatusCode.ERROR, HttpMessage.ERROR);
    }
  }
}
