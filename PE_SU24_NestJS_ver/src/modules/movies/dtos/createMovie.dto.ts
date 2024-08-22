import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum MovieGenres {
  Action = "Action",
  Drama = "Drama",
  Comedy = "Comedy",
  Cartoon = "Cartoon",
}

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title: string;

  //My controllers receive the properties as Date objects when the request was sent with ISO String
  @IsDate()
  @Type(() => Date)
  release: Date;

  @IsString() description: string;
  @IsString() producer: string;
  @IsString() director: string;

  @IsEnum(MovieGenres, { each: true, message: "The genre ? is not supported. Supported genres are: Action, Drama, Comedy, Cartoon." })
  genres: MovieGenres[];

  @IsString({ each: true }) stars: string[];
}
