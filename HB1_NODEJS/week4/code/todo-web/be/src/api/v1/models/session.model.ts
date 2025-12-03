import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Omit<Document, "_id"> {
  _id: string; // sessionId
  userId: mongoose.Types.ObjectId;
  role: string;
  createdAt: Date;
  expiresAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    _id: { type: String, required: true }, // Manual ID
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { _id: false } // We are providing _id manually
);

// We need to ensure _id is the primary key. Mongoose does this by default if we name it _id, 
// but we set _id: false in options to prevent auto ObjectId, 
// however we defined _id in schema so it should work. 
// Actually, if we want to use a custom string ID, we just define it. 
// Let's remove { _id: false } and just let it be, but type: String overrides ObjectId.

export default mongoose.model<ISession>("Session", SessionSchema);
