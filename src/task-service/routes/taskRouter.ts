import { Router } from "express";
import { requireAuth } from "../middleware/auth";              // your local auth middleware
import { validate } from "../middleware/validate";  // your updated validate (no reassign of req.query)
import { taskSchemas } from "../schema/taskSchema";
import * as controller from "../controllers/taskController";

export const taskRouter = Router();

taskRouter
  .route("/")
  .post(requireAuth, validate(taskSchemas.create, "body"), controller.createTask)
  .get(requireAuth, validate(taskSchemas.query, "query"), controller.listTasks);
