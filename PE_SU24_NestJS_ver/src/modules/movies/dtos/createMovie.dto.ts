import { IsDate, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsDate()
  release: Date;

  @IsString()
  description: string;

  @IsString()
  producer: string;

  @IsString()
  director: string;

  @IsString({ each: true })
  genres: string[];

  @IsString({ each: true })
  stars: string[];
}
