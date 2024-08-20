import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './Post.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})

// ==== Trường hợp vẫn muốn có __v vào db nhưng mà data trả về không có __v ====
// @Schema({
//   toJSON: {
//     transform: (doc, ret) => {
//       delete ret.__v;
//       return ret;
//     },
//   },
// })
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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSettings',
  })
  settings?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  })
  postNe: Post[]; // 1 user có nhiều post
}

// This is a factory function that returns a schema object
const UserSchema = SchemaFactory.createForClass(User);
export { UserSchema };
