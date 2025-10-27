import { Request, Response } from "express";
import * as taskService from "../services/taskService";

// POST /api/tasks
export async function createTask(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.id;
    const task = await taskService.createTask(ownerId, req.body);
    return res.status(201).json(task);
  } catch (err) {
    console.error("createTask:", err);
    return res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to create task" });
  }
}

// GET /api/tasks
export async function listTasks(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.id;
    const q = (res.locals.validated?.query ?? { page: 1, limit: 10 }) as {
      page: number; limit: number; projectId?: string; status?: string;
      assigneeId?: string; dueFrom?: Date; dueTo?: Date; sort?: string;
    };
    const result = await taskService.listTasks(ownerId, q);
    return res.json(result);
  } catch (err) {
    console.error("listTasks:", err);
    return res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to list tasks" });
  }
}