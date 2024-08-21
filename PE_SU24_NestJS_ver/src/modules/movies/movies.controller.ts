import { Controller } from '@nestjs/common';
import { MovieService } from './movies.service';

@Controller('movie')
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
}
