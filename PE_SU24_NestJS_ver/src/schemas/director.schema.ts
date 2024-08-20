import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DirectorDocument = HydratedDocument<Director>;

@Schema({
  timestamps: true,
})
export class Director {
  @Prop()
  fullname: string;

  @Prop()
  dob: Date;

  @Prop()
  nationality: string;
}

const DirectorSchema = SchemaFactory.createForClass(Director);
export { DirectorSchema };
