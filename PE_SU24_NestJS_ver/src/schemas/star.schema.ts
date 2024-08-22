import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StarDocument = HydratedDocument<Star>;
//star.schema.ts

@Schema({
  timestamps: true,
})
export class Star {
  @Prop() fullname: string;
  @Prop() male: boolean;
  @Prop() dob: Date;
  @Prop() nationality: string;
}

const StarSchema = SchemaFactory.createForClass(Star);
export { StarSchema };
