//.env
require("dotenv").config();
// Khai báo đối tượng mongo client từ module mongodb
const { MongoClient } = require("mongodb");

//Khởi tạo đối tượng kết nối
const dbClient = new MongoClient(process.env.URL_MONGODB);

//Định nghĩa xử lý kết nối đến mongodb theo cơ chế bất đồng bộ - đồng bộ
//return Promise chỉ trả về 3 giá trị: (resolve, reject, pending) , onFulfilled, onRejected, onFinally
async function connectDB() {
  // tiến hành kết nối đến mongodb
  await dbClient.connect();
  console.log("Connected to MongoDB");
  //chỉ định tên CSDL và tên collection cần làm việc
  const dbName = dbClient.db(process.env.DB_NAME);
  const collection = dbName.collection("students");
  //CRUD
  //Create
  await collection.insertOne({ name: "Nguyen Van A", age: 20 });
  //Read
  const studentList = await collection.find({}).toArray();
  return studentList;
}

// thực thi kết nối và log ra kết quả trả về
connectDB()
  .then(console.log)
  .catch(console.error)
  .finally(() => dbClient.close());
