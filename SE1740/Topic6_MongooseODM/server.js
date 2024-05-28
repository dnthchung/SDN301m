const db = require("./models/index");
const User = db.User;

db.mongoose
  .connect("mongodb://localhost:27017/SE1740_DB", {
    dbName: "SE1740_DB",
  })
  .then((dbResult) => {
    console.log("Successfully connect to MongoDB.");
    const newUser = new User({
      email: "1chungdthe176077@gmail.com",
      password: "123456",
      type: "system",
    });
    //or User.create({email: "", password: "", type: ""})
    //save to database
    newUser
      .save()
      .then((insertedUser) => {
        console.log("User saved successfully", insertedUser);
        //find all users
        const users = User.find([]);
      })
      .then(() => {
        console.log("All users");
      })
      .catch((err) => {
        console.error("Error saving user", err);
      });
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
