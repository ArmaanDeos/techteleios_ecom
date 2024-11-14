import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import { app } from "./app.js";

// configure dotenv
dotenv.config({
  path: "./env",
});

// connecting database 

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection FAILED !", error);
  });
