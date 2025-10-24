import { Router } from "express";
import { mountSwagger } from "../swagger.js";
// (later) import { taskRouter } from "./routes/task.routes.js";

export const apiRouter = Router();

// Swagger docs route
mountSwagger(apiRouter);

