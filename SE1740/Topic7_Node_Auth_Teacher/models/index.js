const mongoose = require('mongoose');
const User = require('./user.model');
const Role = require('./role.model');

// Cau hinh cho mongoose su dung tren toan du an
mongoose.Promise = global.Promise;

// Khai bao doi tuong dai dien CSDL can lam viec cua MongoDB server
const db = {};

// Them cac thuoc tinh cho doi tuong db
db.user = User;
db.role = Role;
db.ROLES = ["member", "mod", "admin"];

db.connectDB = async() => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
    .then(()=> console.log("Connect to MongoDB success."))
    .catch(error => {
        console.error(error.message);
        process.exit();
    })
}

module.exports = db;