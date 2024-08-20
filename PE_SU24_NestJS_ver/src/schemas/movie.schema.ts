import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Star } from './star.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({
  timestamps: true,
})
export class Movie {
  @Prop()
  title: string;

  @Prop()
  release: Date;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producer',
  })
  producer: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
  })
  director: string;

  @Prop({
    type: [String],
  })
  genres: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Star',
  })
  stars: Star[];
}

const MovieSchema = SchemaFactory.createForClass(Movie);
export { MovieSchema };
