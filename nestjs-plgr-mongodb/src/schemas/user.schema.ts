import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    required: false,
  })
  displayName?: string; //displayName is optional - mean can undefined

  @Prop({
    required: false,
  })
  avatarUrl?: string;
}

// This is a factory function that returns a schema object
const UserSchema = SchemaFactory.createForClass(User);
export { UserSchema };
