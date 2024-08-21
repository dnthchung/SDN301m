import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movies.service';
import { CreateMovieDto } from './dtos/createMovie.dto';

@Controller('api/movie')
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

  //get all movies
  @Get()
  async getAllMovies() {
    return await this.movieService.getAllMovies();
  }

  //Q1 : create new movie
  @Post('create')
  async createMovie(@Body() infoIP: CreateMovieDto) {
    return await this.movieService.createMovie(infoIP);
  }
}
