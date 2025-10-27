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