import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

export default app;
