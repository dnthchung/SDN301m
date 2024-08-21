import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true }) title: string;
  @Prop({ type: Date }) release: Date;
  @Prop() description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Producer" }) producer: mongoose.Schema.Types.ObjectId; // object id
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Director" }) director: mongoose.Schema.Types.ObjectId; // object id
  @Prop({ type: [String] }) genres: string[]; // array of string
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Star" }] }) stars: mongoose.Schema.Types.ObjectId[]; // array of object id
}

const MovieSchema = SchemaFactory.createForClass(Movie);
export { MovieSchema };

// @Prop({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Producer',
// })
// producer: string;

// @Prop({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Director',
// })
// director: string;  => save string to db
