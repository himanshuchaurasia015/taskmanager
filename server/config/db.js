import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
const dbURL = process.env.DB_URL;
const dbConnection = async () =>
  await mongoose.connect(dbURL).then(() => {
    console.log("db is connected");
  });

export default dbConnection();
