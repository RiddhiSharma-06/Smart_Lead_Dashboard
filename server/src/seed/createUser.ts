import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";

const MONGO_URI = "mongodb://sharmariddhi060806_db_user:QYeunEt.6R-AYBn@ac-roniwr7-shard-00-00.fk2qvsg.mongodb.net:27017,ac-roniwr7-shard-00-01.fk2qvsg.mongodb.net:27017,ac-roniwr7-shard-00-02.fk2qvsg.mongodb.net:27017/?ssl=true&replicaSet=atlas-9by8z3-shard-0&authSource=admin&appName=Cluster0";

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [
      {
        name: "Admin User",
        email: "admin@test.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Sales User",
        email: "sales@test.com",
        password: hashedPassword,
        role: "sales",
      },
    ];

    await User.deleteMany({});
    await User.insertMany(users);

    console.log("Users created successfully");

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedUsers();