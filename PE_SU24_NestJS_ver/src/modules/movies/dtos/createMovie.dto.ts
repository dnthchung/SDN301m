import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

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
  @IsString({ each: true }) genres: string[];
  @IsString({ each: true }) stars: string[];
}
