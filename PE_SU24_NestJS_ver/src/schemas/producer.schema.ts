import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProducerDocument = HydratedDocument<Producer>;

@Schema({ timestamps: true })
export class Producer {
  @Prop({ required: true })
  name: string;
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
