import { IsNumber, IsString } from "class-validator";

export class CountMoviesByProductDto {
  @IsString()
  readonly producer: string;

  @IsNumber()
  readonly numberOfMovies: number;
}
