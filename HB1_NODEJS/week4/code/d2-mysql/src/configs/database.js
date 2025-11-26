import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || "mysql",
  logging: false, // Tắt log SQL dài dòng trong console
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected successfully.");

    // Đồng bộ Model với Database (Tự tạo bảng nếu chưa có)
    await sequelize.sync({ force: false });
    console.log("Database Synced.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default sequelize;
