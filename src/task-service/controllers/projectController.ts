import { Request, Response } from "express";
import * as projectService from "../services/projectService.js";

/**
 * POST /api/projects
 */
export async function createProject(req: Request, res: Response) {
  try {
    const ownerId = (req as any).user.id;
    const project = await projectService.createProject({ ...req.body, ownerId });
    res.status(201).json(project);
  } catch (err) {
    console.error("createProject:", err);
    res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to create project" });
  }
}

/**
 * GET /api/projects
 */
export async function listProjects(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { page = 1, limit = 10 } = req.query as any;
    const result = await projectService.listProjects(userId, Number(page), Number(limit));
    res.json(result);
  } catch (err) {
    console.error("listProjects:", err);
    res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to list projects" });
  }
}

/**
 * GET /api/projects/:projectId
 */
export async function getProject(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const project = await projectService.getProjectById(req.params.projectId, userId);

    if (project === "FORBIDDEN") return res.status(403).json({ error: "FORBIDDEN", message: "Access denied" });
    if (!project) return res.status(404).json({ error: "NOT_FOUND", message: "Project not found" });

    res.json(project);
  } catch (err) {
    console.error("getProject:", err);
    res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to fetch project" });
  }
}

/**
 * PATCH /api/projects/:projectId
 */
export async function updateProject(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const result = await projectService.updateProject(req.params.projectId, userId, req.body);

    if (result === "FORBIDDEN") return res.status(403).json({ error: "FORBIDDEN", message: "Only owner can update project" });
    if (!result) return res.status(404).json({ error: "NOT_FOUND", message: "Project not found" });

    res.json(result);
  } catch (err) {
    console.error("updateProject:", err);
    res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to update project" });
  }
}

/**
 * DELETE /api/projects/:projectId
 */
export async function deleteProject(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const result = await projectService.deleteProject(req.params.projectId, userId);

    if (result === "FORBIDDEN") return res.status(403).json({ error: "FORBIDDEN", message: "Only owner can delete project" });
    if (!result) return res.status(404).json({ error: "NOT_FOUND", message: "Project not found" });

    res.status(204).send();
  } catch (err) {
    console.error("deleteProject:", err);
    res.status(500).json({ error: "INTERNAL_ERROR", message: "Failed to delete project" });
  }
}
