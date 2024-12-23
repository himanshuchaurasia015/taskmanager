import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import dbConnection from "./config/db.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/scores", scoreRoutes);

const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
