import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Omit<Document, "_id"> {
  _id: string;
  userId: mongoose.Types.ObjectId;
  role: string;
  createdAt: Date;
  expiresAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    _id: { type: String, required: true }, // Tự đặt ID thủ công theo default 
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Chọc tới bảng User
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { _id: false } // Tắt tự động tạo ObjectId, vì đã tự định nghĩa ra thằng _id ở trên
);

// Lưu ý: Mongoose mặc định sẽ tạo _id kiểu ObjectId nếu không cấu hình gì.
// Ở đây m` muốn dùng chuỗi làm ID nên đã định nghĩa _id kiểu String.
// Việc đặt { _id: false } là để ngăn Mongoose tự tạo ObjectId,
// nhưng vì đã khai báo _id trong schema rồi nên vẫn hoạt động bình thường.
// Thực tế, nếu muốn dùng string làm ID thì chỉ cần định nghĩa _id: String là đủ,
// không cần phải set _id: false trong options.

export default mongoose.model<ISession>("Session", SessionSchema);
