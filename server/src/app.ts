import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js"; 

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api", router); // All routes prefixed with /api

export default app;
