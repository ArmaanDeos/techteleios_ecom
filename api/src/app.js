import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// json file
app.use(express.json({ limit: "16kb" }));
// url data
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
// static files
app.use(express.static("public"));
app.use(cookieParser());

//? Routes declaration
app.use("/api/v1/auth", authRoutes);

export { app };
