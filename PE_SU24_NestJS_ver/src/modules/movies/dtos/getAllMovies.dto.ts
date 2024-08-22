// // movie.dto.ts
// import { IsDate, IsString } from "class-validator";

// export class GetAllMoviesDto {
//   @IsString() readonly title: string;
//   @IsDate() readonly release: Date;
//   @IsString() readonly description: string;
//   @IsString() readonly producer: string;
//   @IsString() readonly director: string;
//   @IsString({ each: true }) readonly genres: string[];
//   @IsString({ each: true }) readonly stars: string[];
// }

// import { IsDate, IsNotEmpty, IsString } from "class-validator";

// export class GetAllMoviesDto {
//   @IsString()
//   readonly _id: string;

//   @IsString()
//   readonly title: string;

//   @IsDate()
//   readonly release: Date;

//   @IsString()
//   readonly description: string;

//   @IsString()
//   readonly producer: string;

//   @IsString()
//   readonly director: string;

//   @IsString({ each: true })
//   readonly genres: string[];

//   @IsString({ each: true })
//   readonly stars: string[];
// }
export class GetAllMoviesDto {
  _id: string;
  title: string;
  release: Date;
  description: string;
  producer: string; // Assuming you want the producer's name
  director: string; // Assuming you want the director's fullname
  genres: string[];
  stars: string[]; // Assuming you want an array of star fullnames
}
